import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Repositories = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [filterModal, setFilterModal] = useState(false)
    const [repos, setRepos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getRepos = async () => {
            try {
                const result = await axios(
                    `https://api.github.com/search/repositories?q=topic:react&per_page=20`
                )
                setRepos(result.data.items)
                setIsLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }

        getRepos()
    }, [])

    const getRepos = async (search) => {
        setSearch(search)
        setIsLoading(true)
        // search = search.split(' / ')
        // let user = search[0]
        // let repo = search[1]
        try {
            const result = await axios(
                `https://api.github.com/search/repositories?q=${search}&per_page=20`
            )

            setRepos(result.data.items)
        } catch (error) {
            setRepos([])
        }
        setIsLoading(false)
    }

    return (
        <Container>
            <Title>Buscar repositórios</Title>
            <Filter>
                <Button
                    onPress={() => { setFilterModal(true) }}
                >
                    <FontAwesomeIcon icon={faSlidersH} size={27} />
                </Button>
            </Filter>

            <Modal
                animationType="slide"
                transparent={false}
                visible={filterModal}
            >
                <View style={{ marginTop: 22 }}>
                    <View>
                        <Label>Hello World!</Label>

                        <Button
                            onPress={() => { setFilterModal(false) }}>
                            <Label>Hide Modal</Label>
                        </Button>
                    </View>
                </View>
            </Modal>

            <Label>Pesquisar</Label>
            <Input
                // onSubmitEditing={(event) => getRepos(event.nativeEvent.text)}
                onChangeText={(text) => getRepos(text)}
                value={search}
                placeholder="user / repo"
                placeholderTextColor="rgba(37, 37, 37, 0.3)"
            />

            {
                isLoading
                    ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    repos.length
                        ?
                        <Cards>
                            {
                                repos.map(repo => (
                                    <CardButton
                                        key={repo.id}
                                        onPress={() =>
                                            navigation.push('Details',
                                                {
                                                    id: repo.id
                                                })
                                        }
                                    >
                                        <Card>
                                            <Photo source={{ uri: repo.owner.avatar_url }} />
                                            <Content>
                                                <Name>{repo.name}</Name>
                                                <Description>{repo.description}</Description>
                                            </Content>
                                            <Stars>
                                                <Count>{repo.stargazers_count}</Count>
                                                <FontAwesomeIcon icon={faStar} size={18} />
                                            </Stars>
                                        </Card>
                                    </CardButton>
                                ))
                            }
                        </Cards>
                        :
                        <Result>no results found...</Result>
            }
        </Container>
    )
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 25px 15px;
  margin-top: 22px;
`

const Title = styled.Text`
  display: flex;
  align-items: center;
  margin: 0 15px 10px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000;
  text-transform: uppercase;
  text-align: center;
`

const Button = styled.TouchableNativeFeedback`

`

const Filter = styled.View`
  position: absolute;
  top: 20;
  right: 30;
`

const Modal = styled.Modal`

`

const View = styled.View`

`

const Label = styled.Text`
  width: 100%;
  margin: 0 15px 5px;
  font-family: Roboto;
  font-size: 16px;
  line-height: 19px;
  color: #5d5d5d;
  text-align: left;
`

const Input = styled.TextInput`
  padding: 5px 15px;
  margin: 0 15px 15px;
  background: #fff;
  border: 1px solid #7f7f7f;
  border-radius: 4px;
`

const Cards = styled.ScrollView`
  width: 100%;
`

const CardButton = styled.TouchableNativeFeedback`
`

const Card = styled.View`
  display: flex;
  flex-direction: row;
  padding: 15px 20px;
  margin: 15px;
  background: #fff;
  elevation: 5;
  border-radius: 4px;
`

const Photo = styled.Image`
  width: 55px;
  height: 55px;
  margin-right: 15px;
  border-radius: 50;
`

const Content = styled.View`
  flex: 1;
  padding-right: 15px;
`

const Name = styled.Text`
  margin-bottom: 10px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #5d5d5d;
`

const Description = styled.Text`
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #5d5d5d;
`

const Stars = styled.View`
  align-self: flex-start;
  align-items: center;
  flex-direction: row;
`

const Count = styled.Text`
  margin-right: 15px;
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  color: #000;
`

const Result = styled.Text`
  margin: 0 15px;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  color: #000;
`

export default Repositories