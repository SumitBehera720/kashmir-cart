import os
import shutil
import zipfile

def ignore_backend_patterns(path, names):
    ignored = []
    # Ignore list for Laravel backend files to keep deployment light
    ignore_list = {
        '.git',
        'node_modules',
        'vendor',
        '.env',
        '.env.local',
        '.env.production',
        '.phpunit.result.cache',
        'storage/framework/cache/data',
        'storage/framework/sessions',
        'storage/framework/views',
        'storage/logs',
    }
    
    # We want to match sub-parts of the path or filename
    for name in names:
        full_rel_path = os.path.relpath(os.path.join(path, name), start="backend").replace('\\', '/')
        # Check direct name matches
        if name in ignore_list:
            ignored.append(name)
            continue
        # Check subpath matches
        for pattern in ignore_list:
            if full_rel_path.startswith(pattern):
                ignored.append(name)
                break
                
    return ignored

def zip_dir(dir_path, zip_path):
    print(f"Creating zip archive: {zip_path}...")
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(dir_path):
            for file in files:
                filepath = os.path.join(root, file)
                # Keep directory structure relative to the dir_path
                arcname = os.path.relpath(filepath, start=dir_path)
                zipf.write(filepath, arcname)
    print("Zip archive created successfully!")

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    dist_dir = os.path.join(root_dir, "dist_deploy")
    
    # Reset/clean dist_deploy folder
    if os.path.exists(dist_dir):
        print("Cleaning up old dist_deploy folder...")
        shutil.rmtree(dist_dir)
        
    os.makedirs(dist_dir, exist_ok=True)
    
    # 1. Package Frontend
    frontend_src = os.path.join(root_dir, "out")
    frontend_dest = os.path.join(dist_dir, "frontend")
    if os.path.exists(frontend_src):
        print(f"Copying frontend files from '{frontend_src}' to '{frontend_dest}'...")
        shutil.copytree(frontend_src, frontend_dest)
        
        # Write .htaccess file inside frontend folder
        htaccess_path = os.path.join(frontend_dest, ".htaccess")
        print(f"Creating .htaccess configuration in: {htaccess_path}")
        htaccess_content = """RewriteEngine On

# 1. Force HTTPS (uncomment if you want to enforce https)
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 2. Support custom 404 error page fallback
ErrorDocument 404 /404.html

# 3. Handle routing fallback
# Allow Apache to serve directories with index.html automatically (Default)
DirectoryIndex index.html
"""
        with open(htaccess_path, 'w', encoding='utf-8') as f:
            f.write(htaccess_content)
    else:
        print("WARNING: Frontend build folder 'out' was not found. Please make sure to run 'npm run build' first.")
        
    # 2. Package Backend
    backend_src = os.path.join(root_dir, "backend")
    backend_dest = os.path.join(dist_dir, "backend")
    if os.path.exists(backend_src):
        print(f"Copying backend files from '{backend_src}' to '{backend_dest}' (excluding vendor/node_modules/etc.)...")
        shutil.copytree(backend_src, backend_dest, ignore=ignore_backend_patterns)
        
        # Ensure standard storage directories exist even if empty
        storage_dirs = [
            "storage/app/public",
            "storage/framework/cache",
            "storage/framework/sessions",
            "storage/framework/testing",
            "storage/framework/views",
            "storage/logs"
        ]
        for s_dir in storage_dirs:
            os.makedirs(os.path.join(backend_dest, s_dir), exist_ok=True)
    else:
        print("WARNING: Backend folder 'backend' was not found.")
        
    # 3. Create Zip Archive
    zip_path = os.path.join(root_dir, "dist_deploy.zip")
    if os.path.exists(zip_path):
        os.remove(zip_path)
    zip_dir(dist_dir, zip_path)
    
    print("\nPackage generation complete! Details:")
    print(f"- Distribution Folder: {dist_dir}")
    print(f"- ZIP Package: {zip_path}")
    print("Done!")

if __name__ == "__main__":
    main()
