import {
  Box,
  Divider,
  Heading,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react'
import { ethers, providers } from 'ethers'
import type { NextPage } from 'next'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from 'wagmi'
import React from 'react';
import { IdManagerContract as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import IdManagerContract from '../artifacts/contracts/implementation/CreepzIdManager.sol/CreepzIdManager.json'
import { Layout } from '../components/layout/Layout'
import { useCheckLocalChain } from '../hooks/useCheckLocalChain'
import { useIsMounted } from '../hooks/useIsMounted'
import { CreepzIdManager as IdManagerContractType } from '../types/typechain'
import SubmitReportForm from '../components/report/SubmitReportForm';

/**
 * Constants & Helpers
 */

const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)

const GOERLI_CONTRACT_ADDRESS = '0x3B73833638556f10ceB1b49A18a27154e3828303'


const Home: NextPage = () => {

  const { isLocalChain } = useCheckLocalChain()

  const { isMounted } = useIsMounted()

  const CONTRACT_ADDRESS = isLocalChain
    ? LOCAL_CONTRACT_ADDRESS
    : GOERLI_CONTRACT_ADDRESS

  const { address } = useAccount()

  const provider = useProvider()

  const toast = useToast()

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: IdManagerContract.abi,
    functionName: 'report',
    args: [],
  })

  const { data, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log('success data', data)
      toast({
        title: 'Transaction Successful',
        description: (
          <>
            <Text>Successfully updated the Greeting!</Text>
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
  })

  // call the smart contract, read the current greeting value
  async function fetchContractGreeting() {
    if (provider) {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        IdManagerContract.abi,
        provider
      ) as IdManagerContractType
      try {
        //const data = await contract.report()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Error: ', err)
      }
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <Layout>
      <Heading as="h1" mb="8">
        creepz
      </Heading>

      <Text mt="8" fontSize="xl">
        This page only works on the GOERLI Testnet or on a Local Chain.
      </Text>
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        <Text fontSize="xl">Contract Address: {CONTRACT_ADDRESS}</Text>
        <Divider my="8" borderColor="gray.400" />
        <Box>
          <SubmitReportForm
            address={address}
            isLoading={isLoading}
            onSubmit={() => write?.()} />
        </Box>
      </Box>
    </Layout>
  )
}

export default Home
