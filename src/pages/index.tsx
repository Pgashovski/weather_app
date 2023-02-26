import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Paper, TextInput, Button, Text, Group } from '@mantine/core'
import { useState } from 'react'

const API_KEY = "502506fab279bb846441928ef9280105";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [ cityInput, setCityInput ] = useState ("");

  const [ weatherData, setWeatherData ] = useState<any>({});

  async function getWeatherData() {
    try{
      const serverResponse = await fetch ( 
        "https://api.openweathermap.org/data/2.5/weather?" + 
        "q=" +
        cityInput +
        "&appid=" +
        API_KEY +
        "&units=metric"
        )
        const data = await serverResponse.json();
        console.log(data);
        if (data?.cod === "400" ) throw data;
        setWeatherData(data);
    } catch(err) {

    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main style={{
        position:'static',
        height:'100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1536523965721-a6e354bd19fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80")',
        backgroundSize:'cover',
      }}>
        
        <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)'}}>
        <Paper withBorder p='lg' style={{maxWidth:'500px'}}>
            <Group position='apart' mb={'xs'}>
              <Text size={'xl'} weight={500}>
                Get The Weather!
              </Text>
            </Group>

            <Group position='apart' mb={'xs'}>
              <Text size={'lg'} >
                Enter a city, and get the weather below!
              </Text>
            </Group>

            <Group position='apart' mb={'xs'}>
              <TextInput label='City Name' placeholder='ex: Bitola, MK' onChange={ (e) => setCityInput(e.target.value)} />
            </Group>

            <Group position='apart' mb={'xs'}>
              <Button variant='gradient' size='md' onClick={() => getWeatherData() }>
                Get Weather 
              </Button>
            </Group>
            {Object.keys(weatherData).length !== 0 ?
              <>
            <Group position='left'>
                <Text size={'md'} weight='bold'>
                Weather in {weatherData.name}
                </Text>
            </Group>

            <Group position='left'>
              <img 
                src={'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + "@4x.png"}
                width="100px" height={'100px'}
              />
                <Text size={'lg'} weight='bold'>
                  Currently {weatherData.main.temp} &deg;C
                </Text>
            </Group>
              </>
              : null  
          }
        </Paper>
        </div>

      </main>
    </>
  )
}
