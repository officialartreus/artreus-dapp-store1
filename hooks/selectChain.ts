
import contract from '../contracts-connector/evm/addresses.json'

const chainsXid = {
    7001: "zeta",
    41: "telos",
    54321: "toro",
    512512: "cmp",
    4690: "iotex",
    8081: "shardeum",
    8082: "shardeum",
    137: "polygon",
    42161: "arbitrum"
}

export const getMarketAddress = (chain) => {
    return contract[`${getChain(chain?.id)}MarketAddress`]
}

export const getChain = (id: number) => {
    return chainsXid[`${id}`]
}