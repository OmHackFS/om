graph auth --product hosted-service 016cbbc3be0d4de79d11801af081d10c
cd om-mumbai 
graph deploy --product hosted-service richwarner/om-mumbai

https://thegraph.com/hosted-service/subgraph/richwarner/om-mumbai?selected=playground
https://api.thegraph.com/subgraphs/name/richwarner/om-mumbai

Add startBlock: 20000000 under abi in subgraph.yaml

graph init --product hosted-service --from-contract 0xB726794A462d89b7B082249BF202F12b385470B3 --network mumbai om-mumbai --index-events