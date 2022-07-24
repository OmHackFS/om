graph auth --product hosted-service 016cbbc3be0d4de79d11801af081d10c
cd om-mumbai 
graph deploy --product hosted-service richwarner/om-mumbai

https://thegraph.com/hosted-service/subgraph/richwarner/om-mumbai?selected=playground
https://api.thegraph.com/subgraphs/name/richwarner/om-mumbai

Add startBlock: 27000000 under abi in subgraph.yaml

graph init --product hosted-service --from-contract 0x98552919780D36f04Aaec58C80de436A3CD43f06 --network mumbai om-mumbai --index-events