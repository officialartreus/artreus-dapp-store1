import { NEAR_MARKETPLACE_ADDRESS } from "@/config/constants"
import { get_sales_by_nft_contract_id, nft_tokens } from "@/contracts-connector/near/near-interface"
import { useContractRead } from "wagmi"
import contract from '../../contracts-connector/evm/addresses.json'

export async function getListedNft(limit: number, id: string) {
    let l = []
    l = await get_sales_by_nft_contract_id({
        nft_contract_id: 'newminter.danieldave.testnet',
        from_index: '0',
        limit: limit,
        contractId: NEAR_MARKETPLACE_ADDRESS
    })

    let e = l.filter((e: any) => e.token_id == id)

    try {
        let m = []
        try {
            m = await nft_tokens({
                from_index: id,
                limit: 1
            })
        } catch (error) {
            console.log(error)
        }

        let a;
        await fetch("https://ipfs.io/ipfs/" + m[0].metadata.media, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json().then(res => a = res))
            .catch(error => console.log('error', error));

        return {
            id: id,
            data: a,
            price: e[0] ? e[0].sale_conditions : '0',
            owner_id: e[0] ? e[0].owner_id : m[0].owner_id
        }
    } catch (e) {
        console.log(e)
    }
}

export async function getListedNfts(limit: number) {
    let l = []
    l = await get_sales_by_nft_contract_id({
        nft_contract_id: 'newminter.danieldave.testnet',
        from_index: '0',
        limit: limit,
        contractId: NEAR_MARKETPLACE_ADDRESS
    })

    try {
        l = l.reverse()

        let newerData = l.map(async (e: any) => {

            try {
                let m = []
                try {
                    m = await nft_tokens({
                        from_index: e.token_id,
                        limit: 1
                    })
                } catch (error) {
                    console.log(error)
                }

                let a;
                await fetch("https://ipfs.io/ipfs/" + m[0].metadata.media, {
                    method: 'GET',
                    redirect: 'follow'
                })
                    .then(response => response.json().then(res => a = res))
                    .catch(error => console.log('error', error));

                return {
                    id: e.token_id,
                    data: a,
                    price: e.sale_conditions,
                    owner_id: e.owner_id
                }

            } catch (e) {
                console.log(e)
            }
        })

        newerData = await Promise.all(newerData)
        return (newerData)
    } catch (e) {
        console.log(e)
    }
}

export const getAllDappsListed = async (limit: number) => {
    const zetaContractMarket = '0x894e97fEbBAfB2beaF8d3f207520Ca81047DD471'

    const { data: readData } = useContractRead({
        address: zetaContractMarket,
        abi: contract.marketAbi,
        functionName: 'getAllDappsListed'
    })

    let newerData = readData?.filter(async (data: any, index: number) => {

        if (data.uri != '') {
            let a;
            await fetch("https://ipfs.io/ipfs/" + data.uri, {
                method: 'GET',
                redirect: 'follow'
            })
                .then(response => response.json().then(res => {
                    a = res
                }))
                .catch(error => console.log('error', error));

            return a;
        }

    })

    newerData = await Promise.all(newerData)

    newerData = newerData.filter((data: any) => data != undefined)
    return (newerData)
}