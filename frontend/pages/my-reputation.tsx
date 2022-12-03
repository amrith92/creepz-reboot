import { Box, Divider, Heading, Link, Text, useToast } from '@chakra-ui/react'
import { ethers, providers, utils } from 'ethers'
import type { NextPage } from 'next'
import { useAccount, useContractRead, useProvider } from 'wagmi'
import { Layout } from '../components/layout/Layout'
import { useCheckLocalChain } from '../hooks/useCheckLocalChain'
import { useIsMounted } from '../hooks/useIsMounted'
import { IdManagerContract as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import IdManagerContract from '../artifacts/contracts/implementation/CreepzIdManager.sol/CreepzIdManager.json'
import { CreepzIdManager as IdManagerContractType } from '../types/typechain'
import { keccak256 } from 'ethers/lib/utils.js'
import { useEffect, useState } from 'react'

/**
 * Constants & Helpers
 */

const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)

const GOERLI_CONTRACT_ADDRESS = '0x3B73833638556f10ceB1b49A18a27154e3828303'

const MyReputation: NextPage = () => {
  const { isLocalChain } = useCheckLocalChain()

  const { address } = useAccount()

  const { isMounted } = useIsMounted()

  const CONTRACT_ADDRESS = isLocalChain
    ? LOCAL_CONTRACT_ADDRESS
    : GOERLI_CONTRACT_ADDRESS

  const accountIdHash = address ? keccak256(address) : "";

  const { data: reputationData, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: IdManagerContract.abi,
    functionName: 'getReputation',
    args: [accountIdHash],
  })

  const reputationScore = reputationData?.toString();

  if (!isMounted) {
    return null
  }

  return (
    <Layout>
      <Heading as="h1" mb="8">
        My Reputation
      </Heading>

      <Text mt="8" fontSize="xl">
        {address ? (reputationScore as string) : 'Please Connect Your Wallet'}
      </Text>
    </Layout>
  )
}

export default MyReputation
