export function transformData(data){
    return data.players.map(e=> {
        return({
            uid: e || 0,
            startTime: data.startTime || '17:00',
            attempts: data.match_settings.games_count || 6
        })
    })
}

export function transformDataScores(data){
    return  data.players.map(ply =>{
        return({
            uid: ply || 0,
            attempts: data.attempts|| 6,
            scores: Object.values(data.scores)[data.players.indexOf(ply)]
        })
    })
}

        
    
// }
// const someData = {
//     players: ['1','2','3','5'],
//     startTime: '18:30',
//     match_settings: {
//         games_count: 990
//     }
// }


// const someData2 = {
//     players: ['1','2','3','5'],
//     attempts: 6,
//     scores: [14,52,63,63]
// }

// console.log(transformDataScores(someData2))


