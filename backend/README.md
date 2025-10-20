# SmartMigrate FastAPI backend

## Setup
### 1. Get Python setup on your computer
Install your favorite python, a package manager, and virtual environment manager on your computer. I would recommend [`uv`](https://docs.astral.sh/uv/getting-started/installation/), but `pip` or [`conda`](https://docs.conda.io/projects/conda/en/stable/user-guide/install/index.html) are also fine. This walkthrough will use `uv`.

Once `uv` is installed, install the most recent version of python by running
```
uv python install
```

### 2. Setup virtual environment
First, create a virtual environment in this directory by running
```
uv venv sm
```
Next, activate the venv by running
```
source sm/bin/activate
```
Finally, install all the needed Python packages by running the following from the backend directory
```
uv pip install -r requirements.txt
```

### 3. Start the backend with FastAPI
Now you should be all good to go. Simply run
```
fastapi dev main.py
```
to start the backend on [http://localhost:8000](http://localhost:8000). Happy developing!