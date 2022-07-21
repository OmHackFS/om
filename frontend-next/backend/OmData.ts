import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

class OmData {

    private GRAPH_API_URL = 'https://api.thegraph.com/subgraphs/name/richwarner/om-mumbai';
    
    // Fetch all proposals from subgraph
    async getProposals() {
        const eventQuery = `{ 
            proposalCreatedEvents { 
                id 
                count 
                groupId 
                proposalId 
                proposalName 
                startDate 
                endDate 
                fileUri 
            }}`;
        let data = "";
        const client = new ApolloClient({
            link: new HttpLink({uri: this.GRAPH_API_URL, fetch}),
            cache: new InMemoryCache(),
        })
        try {
          const result = await client.query({ query: gql(eventQuery) });
          data = result.data.proposalCreatedEvents;
        } catch (err) {
          console.log(err);
        } 
        return data;
    }

    // Upload a proposal file to web3.storage and return the URI
    async uploadProposalFile(file: any) {
        file = file;
    }

    // Fetch all votes from subgraph
    async getVotes() {
        const eventQuery = `{
            voteCastEvents {
                id
                count
                groupId
                proposalId
                signal
          }}`;
          let data = "";
          const client = new ApolloClient({
              link: new HttpLink({uri: this.GRAPH_API_URL, fetch}),
              cache: new InMemoryCache(),
          })
          try {
            const result = await client.query({ query: gql(eventQuery) });
            data = result.data.voteCastEvents;
          } catch (err) {
            console.log(err);
          } 
          return data;
    }

    // Fetch and decrypt all screenplays from storage in Lit/Ceramic
    async getScreenplays() {

    }

    // Add screenplay record that will be encrypted and stored in Lit/Ceramic
    async addScreenplay(screenplay: any) {

    }

    // Upload screenplay file that will be encrypted and stored in Lit/Ceramic
    async uploadScreenplayFile(file: any) {

    }

}

export default new OmData()



