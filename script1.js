// 날씨 상태에 따라 이모티콘을 반환하는 함수
function getWeatherEmoji(skyDesc) {
    if (skyDesc.includes("맑음")) {
        return "☀️";
    } else if (skyDesc.includes("구름 많음") || skyDesc.includes("흐림")) {
        return "☁️";
    } else if (skyDesc.includes("비")) {
        return "☔";
    } else if (skyDesc.includes("눈")) {
        return "❄️";
    } else {
        return "❓"; // 알 수 없는 날씨
    }
}

// 공항 코드를 이름으로 변환하는 맵
const airportNames = {
    "RKSS": "김포",
    "RKSI": "인천",
    "RKNY": "양양",
    "RKTU": "청주",
    "RKPC": "김해",
    "RKPK": "부산",
    "RKJJ": "제주",
    "RKJB": "무안"
};

// 모든 공항의 날씨를 개별적으로 가져와서 화면에 표시하는 함수
async function getAirportWeather() {
    const serviceKey = "OEBU5anyrQkL0zi0N1vyjCpBIvoWBYDMB+orxAz7FsyOzDVxU0Bp1YgpSeVnkdfvcbUv2NbRV+O/AEY2mAvD8g==";
    const AIRPORT_IDS = ["RKSS", "RKSI", "RKNY", "RKTU", "RKPC", "RKPK", "RKJJ", "RKJB"];
    
    const CORS_PROXY_URL = "https://corsproxy.io/?";
    
    const now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    let base_date = `${year}${month}${day}`;
    
    let base_time;
    const currentHour = now.getHours();

    if (currentHour >= 17) {
        base_time = "1700";
    } else if (currentHour >= 6) {
        base_time = "0600";
    } else {
        now.setDate(now.getDate() - 1);
        year = now.getFullYear();
        month = String(now.getMonth() + 1).padStart(2, '0');
        day = String(now.getDate()).padStart(2, '0');
        base_date = `${year}${month}${day}`;
        base_time = "1700";
    }

    const weatherDiv = document.getElementById("weatherResult");
    weatherDiv.innerHTML = '<h2>✈️ 국내 주요 공항 기상 정보</h2>';

    for (const airportId of AIRPORT_IDS) {
        const apiUrl = `http://apis.data.go.kr/1360000/MdeMdlService/getMdeMdl?serviceKey=${serviceKey}&base_date=${base_date}&base_time=${base_time}&airPortCd=${airportId}`;
        const finalUrl = `${CORS_PROXY_URL}${encodeURIComponent(apiUrl)}`;
        
        try {
            const response = await fetch(finalUrl);
            const xmlText = await response.text();
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
            
            const item = xmlDoc.querySelector("item");
            if (item) {
                const skyDesc = item.querySelector("skyDesc")?.textContent || "N/A";
                const temp = item.querySelector("temp")?.textContent || "N/A";
                const windDir = item.querySelector("windDir")?.textContent || "N/A";
                const windSpd = item.querySelector("windSpd")?.textContent || "N/A";

                const airportName = airportNames[airportId] || airportId;
                const emoji = getWeatherEmoji(skyDesc);
                
                const airportInfo = document.createElement('div');
                airportInfo.className = 'airport-info';
                airportInfo.innerHTML = `
                    <h3>${emoji} ${airportName} 공항</h3>
                    <p><strong>날씨:</strong> ${skyDesc}</p>
                    <p><strong>온도:</strong> ${temp}°C</p>
                    <p><strong>풍향:</strong> ${windDir}</p>
                    <p><strong>풍속:</strong> ${windSpd} m/s</p>
                `;
                weatherDiv.appendChild(airportInfo);
            } else {
                console.error(`Error: item not found for ${airportId}`);
            }

        } catch (error) {
            console.error(`공항 기상 정보를 가져오는 중 오류 발생: ${error}`);
            const airportName = airportNames[airportId] || airportId;
            const errorInfo = document.createElement('div');
            errorInfo.className = 'airport-info';
            errorInfo.innerHTML = `
                <h3>❌ ${airportName} 공항</h3>
                <p>데이터 로딩 실패</p>
            `;
            weatherDiv.appendChild(errorInfo);
        }
    }
}

getAirportWeather();



