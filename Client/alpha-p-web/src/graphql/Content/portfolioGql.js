import gql from "graphql-tag";

export const PORTFOLIO_GQL = gql`
query HomePageQuery(
  
  $companyFilter: CompanyFilter = {
    Comname: null
    CompanyID: null
    Market: null
    SectorID: null
    Symbol: null
  },
  $id:ID=""
  
) {
  
  getCompanies(companyFilter: $companyFilter) {
    change
    comname
    id
    symbol
    todayFinance {
      close
      date
    }
  }
    findUser(id:$id){
   username
  portofolio{
    name
    id
    followedCompanies{
      symbol
      comname
      change
      todayFinance{
        Open
        high
        low
        close
        volume
        
      }
      change
      
      
    }
    follwedTags
    relatedArticles{
      articleAuthor{
        name
      }
      commentCount
      articleTitle
    }
    
  }
}
}
`;

