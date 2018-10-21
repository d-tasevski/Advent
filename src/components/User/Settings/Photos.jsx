import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Image, Segment, Header, Divider, Grid, Button, Card, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import { toastr } from 'react-redux-toastr';

import 'cropperjs/dist/cropper.css';

import { uploadProfileImg } from '../../../actions/user';

const query = ({ auth }) => [
	{
		collection: 'users',
		doc: auth.uid,
		subcollections: [{ collection: 'photos' }],
		// Store in firebase reducer as 'photos'
		storeAs: 'photos',
	},
];

class PhotosPage extends Component {
	state = {
		files: [],
		fileName: '',
		cropResult: null,
		image: {},
	};

	cropperRef = createRef();

	onDrop = files => this.setState({ files, fileName: files[0].name });

	cropImage = () => {
		if (!this.cropperRef.current) return;

		return this.cropperRef.current.getCroppedCanvas().toBlob(blob => {
			const imageUrl = URL.createObjectURL(blob);
			this.setState({
				cropResult: imageUrl,
				image: blob,
			});
		}, 'image/jpeg');
	};

	cancelCrop = () => this.setState({ files: [], image: {} });

	uploadImage = async () => {
		try {
			await this.props.uploadProfileImg(this.state.image, this.state.fileName);
			this.cancelCrop();
			return toastr.success('Success!', 'Photo has been uploaded');
		} catch (err) {
			return toastr.error('Oops', err.message);
		}
	};

	render() {
		const { files, cropResult } = this.state;
		const { profile } = this.props;
		const photos = this.props.photos
			? this.props.photos.filter(p => p.url !== profile.photoURL)
			: [];

		return (
			<Segment>
				<Header dividing size="large" content="Your Photos" />
				<Grid>
					<Grid.Row />
					<Grid.Column width={4}>
						<Header color="teal" sub content="Step 1 - Add Photo" />
						<Dropzone onDrop={this.onDrop} multiple={false}>
							<div style={{ padding: '30px 10px', textAlign: 'center' }}>
								<Icon name="upload" size="huge" />
								<Header content="Drop image here or click to add" />
							</div>
						</Dropzone>
					</Grid.Column>
					<Grid.Column width={1} />
					<Grid.Column width={4}>
						<Header sub color="teal" content="Step 2 - Resize image" />
						{!!files.length && (
							<Cropper
								style={{ height: 200, width: '100%' }}
								ref={this.cropperRef}
								src={files[0].preview}
								aspectRatio={1} // this will enforce images to be squares
								viewMode={0}
								dragMode="move"
								guides={false}
								scalable={true}
								cropBoxMovable={true}
								cropBoxResizable={true}
								crop={this.cropImage}
							/>
						)}
					</Grid.Column>
					<Grid.Column width={1} />
					<Grid.Column width={4}>
						<Header sub color="teal" content="Step 3 - Preview and Upload" />
						{!!files.length && (
							<div>
								<Image
									style={{ minHeight: '200px', minWidth: '200px' }}
									src={cropResult}
								/>
								<Button.Group>
									<Button
										onClick={this.uploadImage}
										style={{ width: '100px' }}
										positive
										icon="check"
									/>
									<Button
										onClick={this.cancelCrop}
										style={{ width: '100px' }}
										icon="close"
									/>
								</Button.Group>
							</div>
						)}
					</Grid.Column>
				</Grid>

				<Divider />
				<Header sub color="teal" content="All Photos" />

				<Card.Group itemsPerRow={5}>
					<Card>
						<Image src={profile.photoURL} />
						<Button positive>Main Photo</Button>
					</Card>
					{photos.map(p => (
						<Card key={p.id}>
							<Image src={p.url} />
							<div className="ui two buttons">
								<Button basic color="green">
									{p.name}
								</Button>
								<Button basic icon="trash" color="red" />
							</div>
						</Card>
					))}
				</Card.Group>
			</Segment>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile,
	photos: state.firestore.ordered.photos,
});

export default compose(
	connect(
		mapStateToProps,
		{ uploadProfileImg }
	),
	firestoreConnect(auth => query(auth))
)(PhotosPage);
