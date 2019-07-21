import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { TabView, SceneMap } from 'react-native-tab-view'
import axios from 'axios'

const initialState = {
    index: 0,
    routes: [
        {
            key: 'issues',
            title: 'ISSUES'
        },
        {
            key: 'pullRequests',
            title: 'PULL REQUESTS'
        },
        {
            key: 'commits',
            title: 'COMMITS'
        }
    ]
}

const issues = () => (
    <Tab></Tab>
)

const pullRequests = () => (
    <Tab></Tab>
)

const commits = () => (
    <Tab></Tab>
)

const Details = ({ navigation }) => {
    const id = navigation.getParam('id')
    const [repo, setRepo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [state, setState] = useState(initialState)

    useEffect(() => {
        const getRepo = async () => {
            try {
                const result = await axios(
                    `https://api.github.com/repositories/${id}`
                )
                setRepo(result.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }

        getRepo()
    }, [])

    const indexChange = (index) => {
        setState({ ...initialState, index })
    }

    return (
        isLoading
            ?
            <ActivityIndicator size="large" color="#0000ff" />
            :
            <Container>
                <Title>{repo.owner.login}</Title>
                <Photo source={{ uri: repo.owner.avatar_url }} />
                <Stars>
                    <Count>{repo.stargazers_count}</Count>
                    <FontAwesomeIcon icon={faStar} size={18} />
                </Stars>
                <TabView
                    navigationState={state}
                    renderScene={SceneMap({
                        issues: issues,
                        pullRequests: pullRequests,
                        commits: commits
                    })}
                    onIndexChange={indexChange}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
            </Container>
    )
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 25px 0;
  margin-top: 22px;
`

const Title = styled.Text`
  display: flex;
  align-items: center;
  margin: 0 15px 30px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000;
  text-transform: uppercase;
  text-align: center;
`

const Photo = styled.Image`
  width: 55px;
  height: 55px;
  display: flex;
  align-self: center;
  margin-bottom: 25px;
  border-radius: 50;
`

const Repo = styled.Text`
    display: flex;
    align-self: center;
    margin-bottom: 30px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    background: #5D5D5D;
`

const Stars = styled.View`
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`

const Count = styled.Text`
  margin-right: 15px;
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  color: #000;
`

const Tabs = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Tab = styled.View`
    flex: 1;
`

const Text = styled.Text`
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    text-transform: uppercase;
    color: #131314;
`

export default Details