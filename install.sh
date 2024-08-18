## (re)install python
# backend
rm -rf .venv
rm -rf backend/.venv
cd backend
python3 -m venv .venv
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -r requirements.txt
cd ..


## (re)install UI
rm -rf ./node_modules
npm install --force