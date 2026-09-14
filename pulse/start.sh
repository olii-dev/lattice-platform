#!/bin/bash
set -e
cd /home/azureuser/pulse
source /home/azureuser/pulse/venv/bin/activate
export LATTICE_API_SECRET="$(cat /home/azureuser/pulse/.secret)"
export SPARK_MODEL_ID="oli-mebberson/lattice-spark-1.5b"
export HF_HUB_DISABLE_PROGRESS_BARS=1
export PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True
exec uvicorn server:web --host 0.0.0.0 --port 8000
