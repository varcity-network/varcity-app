import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bulma/css/bulma.css';
import PropTypes from 'prop-types';
import { TextSelect, TextArea, UrlInput } from '../app/FormControls';
import { updateMedia, getMedia } from './actions';

// GalleryItem.propTypes = {
//   description: PropTypes.string.isRequired,
//   mediaType: PropTypes.string.isRequired,
//   videoUrl: PropTypes.string,
//   image: PropTypes.object,
//   // onRemove: PropTypes.func.isRequired
// }

// just do this for now
function httpCallback() { console.log('pretending to make api call') }
let value = '';

export function GalleryItem({ options, select, description, videoUrl = '', image = '', mediaType, rotateGallery }) {
  console.log('select is', select);

  return (
    <div className="galleryView">
      <img src={image} alt={description} />
      {/* <button onClick={() => onRemove(item)} >X</button> */}
      <div className="is-grouped is-grouped-multiline">
        <TextSelect className="select" value={select} propName="mediaType" label="Media Type" change={httpCallback} options={options} disabled={false} />
        {select.text === 'video link' &&
        <UrlInput value={value} propName="videoUrl" label="Video Link" change={httpCallback} disabled={false} />
        }
        {select.text === 'image upload' &&
        <div className="file">
          <label className="file-label">
            <input className="file-input" type="file" name="imageUrl" />
            <span className="file-cta">
              <span className="icon file-icon">
                <i class="fa fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file...
              </span>
            </span>
          </label>
        </div>
        }
        <TextArea value={value} propName="description" label="Description" change={httpCallback} disabled={false} />
      </div>
    </div>
  );
}

export class MediaGallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemNum: 0,
      select: { id: "0", text: "video link" },
      selectOptions: [
        { id: "0", text: "video link" },
        { id: "1", text: "image upload" }
      ]
    }
    // this.rotateGallery = this.rotateGallery.bind(this);
    // this.handleMediaSubmit = this.handleMediaSubmit.bind(this);
    // this.getMedia = this.getMedia.bind(this);
    // this.handleImageSelect = this.handleImageSelect.bind(this);
  }

  componentDidMount() {
    // this.props.getMedia();
  }

  handleMediaSubmit(media) {
    // this.props.updateMedia(media);
  }

  rotateGallery(incr) {
    const itemCount = this.state.items.length;
    let newItem = this.state.itemNum + incr;
    if (newItem === itemCount) newItem = 0;
    else if (newItem === -1) newItem = itemCount - 1;
    this.setState({ itemNum: newItem });
  }

  render() {
    const { items, rotateGallery, itemNum, select, selectOptions } = this.state;
    const itemGallery = items.map((item, i) => (
      <GalleryItem key={i} image={item} description={item.description} videoUrl={item.url} mediaType={item.mediaType} rotateGallery={rotateGallery} select={select} options={selectOptions}/>
    ));
    return (
      <div className="tile">
        {/* <GalleryItem rotateGallery={rotateGallery} select={select} options={selectOptions}/> */}
        <nav id="galleryNav">
          <button onClick={() => rotateGallery(-1)}>&laquo; Previous</button> <button onClick={() => rotateGallery(1)}>Next &raquo;</button>
          <p>item {itemNum + 1} of {items.length}</p>
        </nav>
        {itemGallery[itemNum]}
      </div>
    );
  }
}

export default connect(state => {
  return {
    media: state.items,
  };
}, { getMedia, updateMedia })(MediaGallery);
