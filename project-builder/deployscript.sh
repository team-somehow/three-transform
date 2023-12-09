
cd $1
npx hardhat run scripts/deploy.js --network mumbai
rm -r node_modules
cd ..
