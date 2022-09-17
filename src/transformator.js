function transformData(data){
    return data.players.map(e=> {
        return({
            uid: e || 0,
            startTime: data.startTime || '17:00',
            attempts: data.match_settings.games_count || 6
        })
    })
}

const someData = {
    players: ['1','2','3','5'],
    startTime: '18:30',
    match_settings: {
        games_count: 990
    }
}

// console.log(transformData(someData))

export default transformData;
