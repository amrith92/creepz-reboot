import {
  Box,
  Divider,
  Heading,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react'
import { providers, utils } from 'ethers'
import type { NextPage } from 'next'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import React, { useState } from 'react';
import { IdManagerContract as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import IdManagerContract from '../artifacts/contracts/implementation/CreepzIdManager.sol/CreepzIdManager.json'
import { Layout } from '../components/layout/Layout'
import { useCheckLocalChain } from '../hooks/useCheckLocalChain'
import { useIsMounted } from '../hooks/useIsMounted'
import SubmitReportForm from '../components/report/SubmitReportForm';
import { keccak256 } from 'ethers/lib/utils.js';
import { QRCode } from 'react-qr-svg';
import {v4 as uuidv4} from 'uuid';
import proofRequest from '../../proofRequest';

/**
 * Constants & Helpers
 */

const MUMBAI_CONTRACT_ADDRESS = '0xbCFEE8065E595D30E811303ce81711EcC9acDc50'

let qrProofRequestJson: any = { ...proofRequest };
qrProofRequestJson.id = uuidv4();

const Home: NextPage = () => {

  const { isLocalChain } = useCheckLocalChain()

  const { isMounted } = useIsMounted()

  const CONTRACT_ADDRESS = isLocalChain
    ? LOCAL_CONTRACT_ADDRESS
    : MUMBAI_CONTRACT_ADDRESS

  const { address } = useAccount()

  const toast = useToast()

  const [against, setAgainst] = useState("");

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: IdManagerContract.abi,
    functionName: 'report',
    args: [keccak256(utils.toUtf8Bytes(against)), 200, "_"],
  })

  const { data, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log('success data', data)
      toast({
        title: 'Report submitted!',
        description: (
          <>
            <Text>WooHoo! Your report was successfully submitted.</Text>
            <Text>
              <Link
                href={`https://goerli.etherscan.io/tx/${data?.blockHash}`}
                isExternal
              >
                View on Etherscan
              </Link>
            </Text>
          </>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError(error) {
      console.error('error data', error)
      toast({
        title: 'Failed to report!',
        description: (
          <>
            <Text>Your report could not be submitted!.</Text>
            <Text>{error.message}</Text>
          </>
        )
      })
    },
  })

  if (!isMounted) {
    return null
  }

  return (
    <Layout>
      <Heading as="h1" mb="8">
        creepz
      </Heading>

      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        <Text fontSize="xl">Contract Address: {CONTRACT_ADDRESS}</Text>
        <Divider my="8" borderColor="gray.400" />
        <Box>
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify(qrProofRequestJson)}
          />
        </Box>
        <Box>
          <SubmitReportForm
            address={address}
            isLoading={isLoading}
            onValidated={(value: string) => setAgainst(value)}
            onSubmit={() => write?.()} />
        </Box>
      </Box>
    </Layout>
  )
}

export default Home
