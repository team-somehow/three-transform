
cd $1
npx hardhat run scripts/deploy.js --network scrollSepolia
rm -r node_modules
cd ..
