const initialState = {
  category: undefined,
  ranking: undefined,
  error: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'START_REQUEST':
      return {
        category: action.payload.category,
        ranking: undefined,
        error: false
      };
    case 'RECEIVE_REQUEST':
      return action.payload.error
      ? { ...state, error: true }
      : {
          ...state,
          ranking: getRanking(action.payload.response)
        };
    default:
      return state;
  }
}

const getRanking = response => {
  const resultSet = response.ResultSet;
  const ranking = [];
  const itemLength = resultSet.totalResultsReturned;
  for (let i = 0; i < itemLength; i++) {
    const item = resultSet[0].Result[i];
    ranking.push({
      code: item.Code,
      name: item.Name,
      url: item.Url,
      imageUrl: item.Image.Medium
    })
  }
  return ranking;
};