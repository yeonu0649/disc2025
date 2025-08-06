document.addEventListener('DOMContentLoaded', () => {
    // 2024-2025 시즌 최종 순위 데이터입니다.
    const teams = [
        { rank: 1, name: 'Liverpool', logo: '', played: 38, win: 25, draw: 9, lose: 4, goalDiff: 45, points: 84 },
        { rank: 2, name: 'Arsenal', logo: '', played: 38, win: 20, draw: 14, lose: 4, goalDiff: 35, points: 74 },
        { rank: 3, name: 'Manchester City', logo: '', played: 38, win: 21, draw: 8, lose: 9, goalDiff: 28, points: 71 },
        { rank: 4, name: 'Chelsea', logo: '', played: 38, win: 20, draw: 9, lose: 9, goalDiff: 21, points: 69 },
        { rank: 5, name: 'Newcastle United', logo: '', played: 38, win: 20, draw: 6, lose: 12, goalDiff: 21, points: 66 },
        { rank: 6, name: 'Aston Villa', logo: '', played: 38, win: 19, draw: 9, lose: 10, goalDiff: 7, points: 66 },
        { rank: 7, name: 'Nottingham Forest', logo: '', played: 38, win: 19, draw: 8, lose: 11, goalDiff: 12, points: 65 },
        { rank: 8, name: 'Brighton & Hove Albion', logo: '', played: 38, win: 16, draw: 13, lose: 9, goalDiff: 7, points: 61 },
        { rank: 9, name: 'AFC Bournemouth', logo: '', played: 38, win: 15, draw: 11, lose: 12, goalDiff: 12, points: 56 },
        { rank: 10, name: 'Brentford', logo: '', played: 38, win: 16, draw: 8, lose: 14, goalDiff: 9, points: 56 },
        { rank: 11, name: 'Fulham', logo: '', played: 38, win: 15, draw: 9, lose: 14, goalDiff: 0, points: 54 },
        { rank: 12, name: 'Crystal Palace', logo: '', played: 38, win: 13, draw: 14, lose: 11, goalDiff: 0, points: 53 },
        { rank: 13, name: 'Everton', logo: '', played: 38, win: 11, draw: 15, lose: 12, goalDiff: -2, points: 48 },
        { rank: 14, name: 'West Ham United', logo: '', played: 38, win: 11, draw: 10, lose: 17, goalDiff: -16, points: 43 },
        { rank: 15, name: 'Manchester United', logo: '', played: 38, win: 11, draw: 9, lose: 18, goalDiff: -10, points: 42 },
        { rank: 16, name: 'Wolverhampton Wanderers', logo: '', played: 38, win: 12, draw: 6, lose: 20, goalDiff: -15, points: 42 },
        { rank: 17, name: 'Tottenham Hotspur', logo: '', played: 38, win: 11, draw: 5, lose: 22, goalDiff: -1, points: 38 },
        { rank: 18, name: 'Leicester City', logo: '', played: 38, win: 6, draw: 7, lose: 25, goalDiff: -47, points: 25 },
        { rank: 19, name: 'Ipswich Town', logo: '', played: 38, win: 4, draw: 10, lose: 24, goalDiff: -46, points: 22 },
        { rank: 20, name: 'Southampton', logo: '', played: 38, win: 2, draw: 6, lose: 30, goalDiff: -60, points: 12 },
    ];

    const tableBody = document.querySelector('#ranking-table tbody');

    teams.forEach(team => {
        const row = document.createElement('tr');
        if (team.rank === 1) {
            row.classList.add('champions');
        }
        row.innerHTML = `
            <td>${team.rank}</td>
            <td>
                <div class="team-name-cell">
                    <img src="${team.logo}" alt="${team.name} logo" class="team-logo">
                    <span class="team-name">${team.name}</span>
                </div>
            </td>
            <td>${team.played}</td>
            <td>${team.win}</td>
            <td>${team.draw}</td>
            <td>${team.lose}</td>
            <td>${team.goalDiff}</td>
            <td>${team.points}</td>
        `;
        tableBody.appendChild(row);
    });
});