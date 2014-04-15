VE=`pwd`/venv

echo "Creating virtualenv..."
virtualenv --clear --no-site-packages $VE

echo "Installing dependencies..."
$VE/bin/pip install -r requirements.txt
