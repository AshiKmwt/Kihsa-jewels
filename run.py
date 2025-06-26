import subprocess
import os
import sys
import time
import signal
import atexit

# Define processes
frontend_process = None
backend_process = None

def start_frontend():
    """Start the Next.js frontend"""
    print("Starting Next.js frontend...")
    return subprocess.Popen(
        "npm run dev",
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )

def start_backend():
    """Start the Python Flask backend"""
    print("Starting Python Flask backend...")
    return subprocess.Popen(
        [sys.executable, "api/app.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )

def cleanup():
    """Cleanup function to kill processes on exit"""
    if frontend_process:
        print("Stopping frontend...")
        if os.name == 'nt':  # Windows
            subprocess.call(['taskkill', '/F', '/T', '/PID', str(frontend_process.pid)])
        else:  # Unix/Linux/Mac
            os.killpg(os.getpgid(frontend_process.pid), signal.SIGTERM)
    
    if backend_process:
        print("Stopping backend...")
        backend_process.terminate()
        backend_process.wait()

# Register cleanup function
atexit.register(cleanup)

def monitor_output(process, prefix):
    """Monitor and print output from a process"""
    for line in iter(process.stdout.readline, ''):
        if not line:
            break
        print(f"{prefix}: {line.strip()}")

def main():
    global frontend_process, backend_process
    
    try:
        # Start backend
        backend_process = start_backend()
        time.sleep(2)  # Give backend time to start
        
        # Start frontend
        frontend_process = start_frontend()
        
        print("\nBoth services are running!")
        print("Frontend: http://localhost:3000")
        print("Backend API: http://localhost:5000")
        print("\nPress Ctrl+C to stop both services.\n")
        
        # Monitor output from both processes
        while True:
            if backend_process.poll() is not None:
                print("Backend process has stopped unexpectedly.")
                break
                
            if frontend_process.poll() is not None:
                print("Frontend process has stopped unexpectedly.")
                break
                
            # Check for output from backend
            if backend_process.stdout.readable():
                line = backend_process.stdout.readline()
                if line:
                    print(f"Backend: {line.strip()}")
            
            # Check for output from frontend
            if frontend_process.stdout.readable():
                line = frontend_process.stdout.readline()
                if line:
                    print(f"Frontend: {line.strip()}")
                    
            time.sleep(0.1)
            
    except KeyboardInterrupt:
        print("\nShutting down services...")
    finally:
        cleanup()

if __name__ == "__main__":
    main() 