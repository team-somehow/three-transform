import React, { useContext } from 'react';
import { Box, ListItem, Typography, Divider, Button } from '@mui/material';
import { Code, shadesOfPurple, CopyBlock } from 'react-code-blocks';
import { HashLink } from 'react-router-hash-link';
import { FaDownload, FaClipboardList } from 'react-icons/fa';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { IoLogoJavascript } from 'react-icons/io5';
import { FaReact } from 'react-icons/fa';

import { FaPython } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AppContext } from '../../context/AppContext';
import { instance } from '../../config/axios';

const data = [
  {
    id: 1,
    text: 'Initial setup',
    description:
      'Download the ABI from above and paste the files in the frontend folder.',
  },
  {
    id: 2,
    text: 'Download dependencies',
  },
  {
    id: 3,
    text: 'Custom functions',
  },
];

const snippets = [
  {
    id: 1,
    type: 'react',
    text: 'Import',
    code: `import { Contract, ethers, providers } from "ethers";`,
  },
  {
    id: 2,
    type: 'react',
    text: 'Get signature and smart contract',
    code: `const provider = new providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new Contract([deployed_contract_address], [contract_name].abi, signer);`,
  },
  {
    id: 3,
    type: 'react',
    text: 'Integrate the system',
    code: `if (window.ethereum) {
await window.ethereum.enable();

const result = await contract.[function_name](
    param_1],
    param_2]
);

result.wait();
}`,
  },
];

const snippets2 = [
  {
    id: 1,
    type: 'react',
    text: 'Import',
    code: `import { Contract, ethers, providers } from "ethers";`,
  },
  {
    id: 2,
    type: 'react',
    text: 'Get signature and smart contract',
    code: `const provider = new providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new Contract([deployed_contract_address], [contract_name].abi, signer);`,
  },
  {
    id: 3,
    type: 'react',
    text: 'Integrate the system',
    code: `if (window.ethereum) {
const contract = new Contract([depployed_contract_address], [contract_name].abi, signer);`,
  },
  {
    id: 3,
    type: 'react',
    text: 'Integrate the system',
    code: `if (window.ethereum) {
await window.ethereum.enable();

const result = await contract.[function_name](
    param_1],
    param_2]
);

result.wait();
}`,
  },
];

const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'NameSet',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getUserName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
    name: 'setUserName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userNames',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

function Doc() {
  const [toggle, setToggle] = useState('react');
  const [selectedFunction, setSelectedFunction] = useState();
  const [functionList, setFunctionList] = useState([]);
  const [contractAddress, setContractAddress] = useState('0x23762183687');
  const [contractName, setContractName] = useState('MyContract');
  const [snippets, setSnippets] = useState(snippets2);
  const [response, setResponse] = useState(null);
  const { user } = useContext(AppContext);

  React.useEffect(() => {
    console.log(selectedFunction);
    // if(selectedFunction){
    let stringOfID3 = `if (window.ethereum) {
      await window.ethereum.enable();
      
      const result = await contract.${selectedFunction?.name}(`;
    for (let i = 0; i < selectedFunction?.inputs.length; i++) {
      const keys = Object.keys(selectedFunction?.inputs[i]);
      for (let j = 0; j < keys.length; j++) {
        stringOfID3 += `${keys[j]}: ${selectedFunction?.inputs[i][keys[j]]}`;
      }

      if (i !== selectedFunction.inputs.length - 1) {
        stringOfID3 += `,`;
      }
      
    }
    stringOfID3 += `);`;
    stringOfID3 += `
      result.wait();
    }`;

    let temp = [
      {
        id: 1,
        type: 'react',
        text: 'Import',
        code: `import { Contract, ethers, providers } from "ethers";`,
      },
      {
        id: 2,
        type: 'react',
        text: 'Get signature and smart contract',
        code: `const provider = new providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new Contract(${contractAddress}, ${contractName}.abi, signer);`,
      },
      {
        id: 3,
        type: 'react',
        text: 'Integrate the system',
        code: stringOfID3,
      },
    ];
    setSnippets(temp);
  }, [contractAddress, contractName, selectedFunction]);

  React.useEffect(() => {
    const getData = async () => {
      console.log(response.abi.abi);
      const res = await instance.post('/rest-api', {
        abi: response.abi.abi,
      });
      setFunctionList(res.data);
    };
    getData();
  }, [response]);

  const handleArtifactDownload = async () => {
    setTimeout(() => {
      window.open(response?.abiUrl, '_blank', 'noopener,noreferrer');
    }, 5000);
    return;
    axios
      .post('http://127.0.0.1:5002/getABI', {
        code: code,
        contractName: contractName,
      })
      .then((res) => {
        console.log('CID', res.data.CID);
        console.log(
          'IPFS URL',
          `https://gateway.lighthouse.storage/ipfs/${res.data.CID}`
        );
        window.open(
          `https://gateway.lighthouse.storage/ipfs/QmbPWxcRnKq2bQqNPuzq9cTqKCiVAFky6xRN4ZZuD7VRNE`,
          '_blank',
          'noopener,noreferrer'
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getDoc(doc(db, 'users', user?.address));
      console.log(response.data());
      const { urls } = response.data();
      setResponse(urls);
      setContractName(urls?.contractName);
      setContractAddress(response.data().contractAddress);
    };
    fetchData();
  }, [user]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      mx="auto"
      height="calc(100vh - 4rem)"
      padding={2}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.20)',
          background: 'linear-gradient(180deg, #2B243C 0%, #0B031E 100%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '20%',
            height: '100%',
            p: 2,
          }}
        >
          {data.map(({ id, text }) => (
            <ListItem key={id} sx={{ display: 'list-item' }}>
              <Typography
                variant="body2"
                fontWeight={500}
                component={HashLink}
                color="white"
                sx={{ textDecoration: 'none' }}
                to={'#' + text.replace(/\s+/g, '-').toLowerCase()}
              >
                {text}
              </Typography>
            </ListItem>
          ))}
        </Box>
        <Divider
          orientation="vertical"
          sx={{
            bgcolor: '#EEEEF0',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            height: '100%',
            p: 2,
            pr: 10,
            ml: 2,
            scrollBehavior: 'smooth',
            overflow: 'auto',
          }}
        >
          {data.map(({ id, text, description }) => (
            <Box key={id} id={text.replace(/\s+/g, '-').toLowerCase()}>
              <Typography variant="h4" fontWeight={600} mt={1}>
                {text}
              </Typography>
              <Divider sx={{ mt: 1, mb: 2, bgcolor: '#2E3C51' }} />
              <Typography variant="body" fontWeight={500} mt={1}>
                {description}
              </Typography>
              {id === 1 && (
                <Box
                  my={2}
                  sx={{
                    display: 'flex',
                    gap: '5px',
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<FaDownload />}
                    onClick={() => handleArtifactDownload()}
                  >
                    Download Artifacts
                  </Button>
                  <img src="arrow.svg" alt="------>" />
                  <Button variant="outlined" startIcon={<FaClipboardList />}>
                    Copy files to frontend
                  </Button>
                </Box>
              )}
              {id === 2 && (
                <Box
                  my={2}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CopyBlock
                    text={'npm install ethers'}
                    language={'shell'}
                    theme={shadesOfPurple}
                    showLineNumbers={false}
                    customStyle={{
                      padding: '10px',
                    }}
                  />
                  <Typography variant="body" fontWeight={500} mt={2}>
                    {`Note: make sure that `}
                    <Code
                      text={'windows.ether'}
                      language={'env'}
                      theme={shadesOfPurple}
                      showLineNumbers={false}
                    />
                    {` exists in the enviournment variable `}
                  </Typography>
                </Box>
              )}
              {id === 3 && (
                <Box
                  my={2}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid #2E3C51',
                    borderRadius: '0.5rem',
                    p: '0.5rem',
                    gap: '0.5rem',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '30%',
                      borderRadius: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.10)',
                      p: '0.5rem',
                    }}
                  >
                    <Typography variant="body" fontWeight={600} my={1} ml={1}>
                      Function Names
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                    {functionList?.map((funcName, index) => (
                      <ListItem
                        variant="body"
                        mt={2}
                        key={index}
                        sx={{
                          color:
                            selectedFunction === funcName ? 'white' : '#EEEEF0',
                          fontWeight:
                            selectedFunction === funcName ? '600' : '400',
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedFunction(funcName)}
                      >
                        {`${funcName?.name}()`}
                      </ListItem>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      borderRadius: '0.5rem',
                      p: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.10)',
                    }}
                  >
                    <ToggleButtonGroup
                      value={toggle}
                      exclusive
                      onChange={(e) => {
                        setToggle(e.target.value);
                      }}
                      size="small"
                      sx={{
                        color: 'white',
                      }}
                    >
                      <ToggleButton value="javascript">
                        <IoLogoJavascript style={{ marginRight: '0.3rem' }} />
                        Javascript
                      </ToggleButton>
                      <ToggleButton value="react">
                        <FaReact style={{ marginRight: '0.3rem' }} />
                        React
                      </ToggleButton>
                      <ToggleButton value="python">
                        <FaPython style={{ marginRight: '0.3rem' }} />
                        Python
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <Divider sx={{ mt: 1 }} />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0.5rem',
                      }}
                    >
                      {snippets.map(({ id, text, code }) => (
                        <Box key={id} mb={3}>
                          <Typography variant="body" fontWeight={600}>
                            {text}
                          </Typography>
                          <CopyBlock
                            text={code}
                            language={'jsx'}
                            theme={shadesOfPurple}
                            showLineNumbers={false}
                            wrapLongLines
                            customStyle={{
                              padding: '10px',
                              marginTop: '10px',
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Doc;
