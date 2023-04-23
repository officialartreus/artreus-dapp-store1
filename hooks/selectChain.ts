
import contract from '../contracts-connector/evm/addresses.json'
import { useIsMounted } from './useIsMounted'

const chainsXid = {
    7001: "zeta",
    41: "telos",
    54321: "toro",
    512512: "cmp",
    4690: "iotex",
    8081: "shardeum",
    8082: "shardeum",
}

export const getMarketAddress = () => {

    const chainId = Number(window.ethereum.chainId).toString()
    return contract[`${getChain(chainId)}MarketAddress`]

}

export const getChain = (id: number) => {
    return chainsXid[`${id}`]
}