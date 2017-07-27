/**
 * Created by Luteh on 13/07/2017.
 */
import React, {Component} from "react";
import {Platform, Text, View, ScrollView} from "react-native";
import {Button, Card} from "react-native-elements";
import {connect} from 'react-redux'

class ReviewScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Review Jobs',
        headerRight:
            <Button
                title='Settings'
                onPress={() => {
                    navigation.navigate('settings')
                }}
                backgroundColor='rgba(0,0,0,0)'
                color="rgba(0,122,255,1)"
            />,
        headerStyle: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }
    });

    renderLikedJobs() {
        // Map over the lists of all the different likes job which has been passing as props
        return this.props.likedJobs.map(job => {
            return (
                <Card>
                    <View style={{height: 200}}>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{job.company}</Text>
                            <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
                        </View>
                    </View>
                </Card>
            )
        })
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
}

const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
};

function mapStateToProps(state) {
    return {likedJobs: state.likedJobs}
}

export default connect(mapStateToProps)(ReviewScreen);