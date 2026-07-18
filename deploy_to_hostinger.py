import os
import subprocess
import paramiko
import time

def run_local_cmd(cmd, cwd=None):
    print(f"Running local command: {cmd}")
    result = subprocess.run(cmd, shell=True, cwd=cwd, text=True, capture_output=True)
    if result.returncode != 0:
        print(f"ERROR: Command failed with code {result.returncode}")
        print("STDOUT:")
        print(result.stdout)
        print("STDERR:")
        print(result.stderr)
        raise RuntimeError(f"Command failed: {cmd}")
    print("Success!")
    return result.stdout

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Run Next.js production build
    print("\n--- Step 1: Running Next.js Build ---")
    try:
        run_local_cmd("npm run build", cwd=root_dir)
    except Exception as e:
        print("Next.js build failed. Stopping deployment.")
        return
        
    # 2. Run packaging script
    print("\n--- Step 2: Packaging files ---")
    try:
        run_local_cmd("python package_deploy.py", cwd=root_dir)
    except Exception as e:
        print("Packaging failed. Stopping deployment.")
        return

    # SSH & SFTP Configuration
    host = '145.79.58.122'
    port = 65002
    username = 'u892283443'
    password = 'Jyoti@45jrs'
    domain = 'lightslategray-buffalo-652025.hostingersite.com'
    
    zip_filename = "dist_deploy.zip"
    local_zip_path = os.path.join(root_dir, zip_filename)
    
    if not os.path.exists(local_zip_path):
        print(f"ERROR: ZIP file not found at {local_zip_path}")
        return

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        # 3. Connect to SSH/SFTP
        print("\n--- Step 3: Connecting to Hostinger ---")
        ssh.connect(host, port=port, username=username, password=password, timeout=30)
        print("SSH Connected successfully!")
        
        sftp = ssh.open_sftp()
        print("SFTP Channel opened.")
        
        # 4. Upload zip file
        print(f"\n--- Step 4: Uploading {zip_filename} to Hostinger ---")
        remote_zip_path = f"/home/{username}/{zip_filename}"
        sftp.put(local_zip_path, remote_zip_path)
        print("Upload completed successfully!")
        sftp.close()
        
        # 5. Extract and Deploy on Hostinger
        print("\n--- Step 5: Extracting and Deploying files on Hostinger ---")
        
        temp_dir = f"/home/{username}/temp_deploy_extract"
        
        commands = [
            # Ensure old temp extract dir is deleted, then extract the new zip there
            f"rm -rf {temp_dir}",
            f"mkdir -p {temp_dir}",
            f"unzip -o {remote_zip_path} -d {temp_dir} > /dev/null",
            
            # Clean public_html except for the 'api' symlink
            f"find /home/{username}/domains/{domain}/public_html -mindepth 1 -maxdepth 1 ! -name 'api' -exec rm -rf {{}} +",
            
            # Copy new frontend files
            f"cp -r {temp_dir}/frontend/* /home/{username}/domains/{domain}/public_html/",
            
            # Update Laravel backend files
            f"cp -rf {temp_dir}/backend/* /home/{username}/kashmir_backend/",
            
            # Clean local bootstrap cache and discover packages on the server
            f"rm -f /home/{username}/kashmir_backend/bootstrap/cache/packages.php",
            f"rm -f /home/{username}/kashmir_backend/bootstrap/cache/services.php",
            f"rm -f /home/{username}/kashmir_backend/bootstrap/cache/config.php",
            f"rm -f /home/{username}/kashmir_backend/bootstrap/cache/routes.php",
            f"cd /home/{username}/kashmir_backend && php artisan package:discover",
            
            # Run Laravel migrations and clear/warm caches
            f"cd /home/{username}/kashmir_backend && php artisan migrate --force",
            f"cd /home/{username}/kashmir_backend && php artisan optimize:clear",
            f"cd /home/{username}/kashmir_backend && php artisan config:cache",
            f"cd /home/{username}/kashmir_backend && php artisan route:cache",
            
            # Clean up remote temporary files
            f"rm -rf {temp_dir}",
            f"rm -f {remote_zip_path}"
        ]
        
        for cmd in commands:
            print(f"Executing remote command: {cmd}")
            stdin, stdout, stderr = ssh.exec_command(cmd)
            
            # Read stdout and stderr to verify execution status
            out_str = stdout.read().decode().strip()
            err_str = stderr.read().decode().strip()
            
            if out_str:
                print(f"[STDOUT]:\n{out_str}")
            if err_str:
                # Some Laravel optimization commands might output warnings to stderr, let's print it
                print(f"[STDERR/INFO]:\n{err_str}")
                
        print("\nDeployment completed successfully!")
        print(f"Verify at: http://{domain}/")

    except Exception as e:
        print("\nERROR occurred during deployment:", e)
    finally:
        ssh.close()
        print("SSH Connection closed.")

if __name__ == "__main__":
    main()
