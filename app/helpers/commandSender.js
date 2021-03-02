import settings from 'settings';
import { typeCasting } from 'helpers/common';
import { webSocket } from './webSocket';

const getClassifierData = ({ rid, summaryListType, begin, end }) => {
  let command;
  switch (summaryListType) {
    case 'upcoming':
      command = {
        command: 'get_info',
        rid,
        params: {
          championship: false,
          infoType: 'gameList',
          filter: {
            sport: {
              id: settings.sportIds,
            },
            game: {
              type: [0, 1, 2],
              start_ts: {
                begin,
                end,
              },
            },
          },
          outputfields: {
            sport: ['id', 'alias', 'name'],
            competition: ['id', 'name'],
            game: ['id'],
          },
          subscribe: true,
        },
      };
      break;
    case 'result':
      command = {
        command: 'get_result',
        rid,
        params: {
          championship: true,
          filter: {
            skip: 0,
            limit: 0,
            sport: {
              id: settings.sportIds,
            },
            game: {
              start_ts: {
                begin,
                end,
              },
            },
          },
          outputfields: {
            sport: ['id', 'alias', 'name'],
            competition: ['id', 'name'],
            game: ['id'],
          },
        },
      };
      break;
    case 'champion':
      command = {
        command: 'get_info',
        rid,
        params: {
          championship: true,
          infoType: 'game',
          filter: {
            sport: {
              id: settings.sportIds,
            },
            game: {
              start_ts: {
                begin,
                end,
              },
            },
          },
          outputfields: {
            sport: ['id', 'alias', 'name'],
            competition: ['id', 'name'],
            game: ['id'],
          },
        },
      };
      break;
    default:
      command = {};
  }

  webSocket().send(JSON.stringify(command));
};

const getChampionData = ({
  rid,
  casualSelect,
  viewCompetitionId,
  begin,
  end,
}) => {
  const command = {
    command: 'get_info',
    rid,
    params: {
      championship: true,
      infoType: 'game',
      filter: {
        // skip: 0,
        // limit: 30,
        sport: {
          id: casualSelect === 'all' ? settings.sportIds : undefined,
        },
        competition: {
          id: casualSelect === 'all' ? undefined : viewCompetitionId,
        },
        game: {
          start_ts: {
            begin,
            end,
          },
        },
      },
      outputfields: {
        game: [
          'id',
          'type',
          'markets_count',
          'start_ts',
          'team1_name',
          'team1_id',
        ],
        market: ['id', 'market_type'],
        event: ['id', 'price', 'name'],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getGameData = ({ rid, casualSelect, viewCompetitionId, begin, end }) => {
  const command = {
    command: 'get_info',
    rid,
    params: {
      championship: false,
      infoType: 'game',
      filter: {
        // skip: 0,
        // limit: 30,
        sport: {
          id: casualSelect === 'all' ? settings.sportIds : undefined,
        },
        competition: {
          id: casualSelect === 'all' ? undefined : viewCompetitionId,
        },
        game: {
          start_ts: {
            begin,
            end,
          },
        },
        market: {
          market_type: ['MatchWinner'],
        },
        // market: {
        //   type: ['P1P2'],
        //   display_key: ['WINNER'],
        //   display_sub_key: ['MATCH'],
        // },
      },
      outputfields: {
        game: [
          'id',
          'type',
          'markets_count',
          'start_ts',
          'team1_name',
          'team2_name',
          'team1_id',
          'team2_id',
        ],
        market: ['id'],
        event: ['id', 'price', 'name'],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getMarketData = (rid, gameId) => {
  const id = typeCasting(gameId, 'number');
  const command = {
    command: 'get_info',
    rid,
    params: {
      infoType: 'game',
      filter: {
        game: {
          id: [id],
        },
      },
      outputfields: {
        market: [
          'id',
          'name',
          'type',
          'group_id',
          'group_name',
          'market_type',
          'order',
          'base',
        ],
        event: ['id', 'name', 'price', 'base', 'order', 'result'],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getGameResultData = ({
  rid,
  casualSelect,
  viewCompetitionId,
  sportId,
  skip,
  begin,
  end,
}) => {
  const command = {
    command: 'get_result',
    rid,
    params: {
      filter: {
        skip,
        limit: 30,
        sport: {
          id: casualSelect === 'all' ? settings.sportIds : sportId,
        },
        competition: {
          id: casualSelect === 'all' ? undefined : viewCompetitionId,
        },
        game: {
          start_ts: {
            begin,
            end,
          },
        },
        market: {
          market_type: ['MatchWinner'],
        },
        // market: {
        //   display_key: ['WINNER'],
        //   display_sub_key: ['MATCH'],
        // },
      },
      outputfields: {
        game: [],
        market: [],
        event: [],
      },
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getMarketResultData = (rid, gameId) => {
  const id = typeCasting(gameId, 'number');
  const command = {
    command: 'get_result',
    rid,
    params: {
      infoType: 'game',
      filter: {
        skip: 0,
        limit: 0,
        sport: {
          id: settings.sportIds,
        },
        game: {
          id: [id],
        },
      },
      outputfields: {
        market: [],
        event: [],
      },
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getResultMarketGameInfo = (rid, gameId) => {
  const command = {
    command: 'get_result',
    rid,
    params: {
      filter: {
        skip: 0,
        limit: 0,
        sport: {
          id: settings.sportIds,
        },
        game: {
          id: [gameId],
        },
      },
      outputfields: {
        game: [
          'id',
          'team1_name',
          'team2_name',
          'team1_id',
          'team2_id',
          'start_ts',
          'final_score',
          'is_closed',
        ],
      },
    },
  };

  webSocket().send(JSON.stringify(command));
};

const getMarketGameInfo = (rid, gameId) => {
  const command = {
    command: 'get_info',
    rid,
    params: {
      infoType: 'game',
      filter: {
        skip: 0,
        limit: 0,
        sport: {
          id: settings.sportIds,
        },
        game: {
          id: [gameId],
        },
      },
      outputfields: {
        game: [
          'id',
          'team1_name',
          'team2_name',
          'team1_id',
          'team2_id',
          'type',
          'start_ts',
          'final_score',
        ],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const getEventData = ({ rid, gameIds, eventIds, marketIds }) => {
  const command = {
    command: 'get_info',
    rid,
    params: {
      infoType: 'event',
      filter: {
        game: {
          id: gameIds,
        },
        market: {
          id: marketIds,
        },
        event: {
          id: eventIds,
        },
      },
      outputfields: {
        game: ['id'],
        market: ['id'],
        event: ['id', 'price', 'name'],
      },
      subscribe: true,
    },
  };
  webSocket().send(JSON.stringify(command));
};

const doBet = ({ betType, rid, bets, stake, sys_bet, mode }) => {
  try {
    const command = {
      command: 'do_bet',
      params: {
        type: settings.betTypeCodeConvert[betType],
        mode,
        bets,
        amount: stake.toString(),
        sys_bet,
      },
      rid,
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

const login = (rid, Authtoken, lang) => {
  try {
    const command = {
      command: 'restore_login',
      params: {
        source: 2,
        production: 'ESP',
        auth_token: Authtoken,
        lang,
      },
      rid,
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

const unsubscribe = (rid, subid) => {
  try {
    const command = {
      command: 'unsubscribe',
      params: {
        subid,
      },
      rid,
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

const getLiveData = rid => {
  try {
    const command = {
      command: 'get_info',
      rid,
      params: {
        infoType: 'game',
        liveVideo: true,
        filter: {
          sport: {
            id: settings.sportIds,
          },
          game: {
            type: [1],
            video_url: true,
          },
          market: {
            market_type: ['MatchWinner'],
          },
          // market: {
          //   type: ['P1P2'],
          //   display_key: ['WINNER'],
          //   display_sub_key: ['MATCH'],
          // },
        },
        outputfields: {
          game: [
            'id',
            'video_url',
            // 'team1_id',
            // 'team1_name',
            // 'team2_id',
            // 'team2_name',
            'video_id3',
            // 'start_ts',
            // 'markets_count',
          ],
          // market: ['id'],
          // event: ['price', 'id', 'name'],
        },
        subscribe: true,
      },
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

const getRecommandGame = rid => {
  try {
    const command = {
      command: 'get_info',
      rid,
      params: {
        infoType: 'recommendedGames',
        filter: {
          market: {
            market_type: ['MatchWinner'],
          },
          // market: {
          //   type: ['P1P2'],
          //   display_key: ['WINNER'],
          //   display_sub_key: ['MATCH'],
          // },
        },
        outputfields: {
          game: [
            'id',
            'type',
            'markets_count',
            'start_ts',
            'team1_name',
            'team2_name',
            'team1_id',
            'team2_id',
          ],
          market: ['id'],
          event: ['id', 'price', 'name'],
        },
        subscribe: true,
      },
    };
    webSocket().send(JSON.stringify(command));
  } catch (e) {
    console.error(e);
  }
};

export {
  getMarketGameInfo,
  getResultMarketGameInfo,
  getClassifierData,
  getGameData,
  getMarketData,
  getGameResultData,
  getMarketResultData,
  getEventData,
  doBet,
  login,
  unsubscribe,
  getRecommandGame,
  getLiveData,
  getChampionData,
};
