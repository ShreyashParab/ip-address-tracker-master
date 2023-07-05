
let ipInput = document.getElementById('ipInput')
let ipSubmit = document.getElementById('ipSubmit')

let ipAddress = document.getElementById('ipAdress')
let location_address = document.getElementById('location')
let timezone = document.getElementById('timezone')
let isp = document.getElementById('isp')
let lat
let long
var map = null
let error = document.getElementById('error')
let flag = false

    ipSubmit.addEventListener('click',()=>{
        let arr = ipInput.value.split('.')

        for (let i = 0; i < arr.length; i++)
        {
            if (!(Number(arr[i]) >= 0 && Number(arr[i]) <= 255))
            {
                flag = true;
                break;
            }
        }   

        if(ipInput.value.length > 0 && ipInput.value.split('.').length-1 == 3 && flag == false)
        {
            fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_1erOXtT8taF21qN6Rnh9rKeceTl7P&ipAddress=${ipInput.value}`)
            .then(res => res.json())
            .then(data => {
                
            ipAddress.innerHTML = `${data.ip}`
            location_address.innerHTML = `${data.location.country} , ${data.location.region}`
            timezone.innerHTML = `UTC${data.location.timezone}`
            isp.innerHTML = `${data.isp}`
            
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${data.location.region},+${data.location.country}&key=bcceb7de5f42465a84e234d0494c05a9`)
            .then(response => response.json())
            .then(result =>{

                lat = result.results[0].geometry.lat
                long = result.results[0].geometry.lng
                
                if(map !== null)
                {
                    map.remove()
                }

                map = L.map('map').setView([lat, long], 13); 

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
                
                var marker = L.marker([lat, long]).addTo(map); 
                marker.bindPopup("<b>Current Location</b>").openPopup();
            })
        
        })
        ipInput.value = ''
        error.style.display = 'none'
    }
    else{
        error.style.display = 'block'
        flag = false
    }
    })
