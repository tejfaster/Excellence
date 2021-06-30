import React, { useReducer, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const set_Page = 'Input_Page'
const set_data = 'Set_data'

const reducer = (state, action) => {
    switch (action.type) {
        case set_Page:
            return {
                ...state,
                page: action.page
            }
        case set_data:
            return {
                ...state,
                item: action.data
            }
    }
}

const Api = () => {

    const [initalState, dispatch] = useReducer(reducer, {
        item: [],
        page: '',
    })


    console.log(initalState.page)

    const submitHandler = (page) => {
        fetch(`https://reqres.in/api/users?page=${page}`)
            .then(res => res.json())
            .then(res => {
                // console.log(res.data)
                dispatch({ type: set_data, data: res.data })
            })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Page {initalState.page}</Text>
            <View style={styles.subcontainer}>
                <View >
                    <TextInput
                        placeholder="Enter Your Page no."
                        value={initalState.page}
                        onChangeText={(text) => dispatch({ type: set_Page, page: text })}
                        maxLength={2}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => submitHandler(initalState.page)}>
                    <Text >Ok</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={initalState.item}
                    keyExtractor={item => item.id}
                    renderItem={item => (
                        <View style={styles.data}>
                            <Image style={styles.image} source={{ uri: item.item.avatar }} />
                            <View style={{ flexDirection: 'column',paddingHorizontal:10 }}>
                                <Text style={styles.first}>Name: {item.item.first_name}<Text style={styles.last}> {item.item.last_name}</Text></Text>
                                <Text style={styles.email}>Email: {item.item.email}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('3%'),
    },
    header: {
        fontSize: hp('4%'),
        fontWeight: '700',
        fontFamily: 'Arial',
        alignSelf: 'center',
    },
    subcontainer: {
        marginVertical: wp('3%'),
        borderWidth: 1,
        height: hp('7%'),
        justifyContent: 'space-between',
        borderRadius: 10,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: 'lightblue',
        height: '90%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2.5,
        borderRadius: 10
    },
    data: {
        // flex:1,
        height: hp('12%'),
        width: wp('80%'),
        flexDirection: 'row'
    },
    image: {
        overflow: 'hidden',
        height: hp('10%'),
        width: wp('20%')
    },
    first: {
        color: 'green',
        fontSize: hp('2%')
    },
    last: {
        color: 'blue',
        fontSize: hp('2%')
    },
    email: {
        color: 'grey',
        fontSize: hp('2%'),
        marginTop:hp('2%')
    }
})
export default Api
