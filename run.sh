
echo "Hi "

echo "Who are you?"

read name
read kind

# echo Glad you are $how

echo Hi $name, I think you $kind


safeName=cp+${name//\//-}

echo $safeName