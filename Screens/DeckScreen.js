/**
 * Created by Luteh on 13/07/2017.
 */
import React, {Component} from 'react'
import {View, Text, Platform} from 'react-native'
import {MapView} from 'expo'
import {Card, Button} from 'react-native-elements'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Swipe from '../components/Swipe'

class DeckScreen extends Component {

    renderCard(job) {
        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02
        };
        return (
            <Card
                containerStyle={{height: 500}}
                title={job.jobtitle}
            >
                <View style={{height: 300}}>
                    <MapView
                        scrollEnabled={false}
                        style={{flex: 1}}
                        // cacheEnabled : turn component to be image if true, but use more memory
                        cacheEnabled={Platform.OS === 'android' ? true : false}
                        initialRegion={initialRegion}
                    >
                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>
                    {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                </Text>
            </Card>
        )
    }

    renderNoMoreCard() {
        return (
            <Card title="No More Jobs!">
                <Button
                    title="Back to Map"
                    large
                    icon={{name: 'my-location'}}
                    backgroundColor="#03A9F4"
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        )
    }

    render() {
        return (
            <View style={{marginTop: 10}}>
                <Swipe
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCard.bind(this)}
                    keyProp="jobkey"
                    onSwipeRight={job => this.props.likeJob(job)}
                />
            </View>
        )
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
};

function mapStateToProps({jobs}) {
    return {jobs: jobs.results}
}

export default connect(mapStateToProps, actions)(DeckScreen);