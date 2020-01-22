import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
	return (

		<div>
			<p className='f3 white'>
				{'This application predicts which celebrity is in the picture you submit and provides the accuracy'}
				<p className='f3 white'>
				{'1. Copy the image address of your desired picture'}
				</p>
				<p className='f3 white'>
				{'2. Paste the link in the form and press detect'}
				</p>
				<p className='f3 white'>
				{'3. Discover your celebrity!'}
				</p>
			</p>

			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
				<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
				<button 
				className='w-30 grow f4 link ph3 pv2 dib white bg-black'
				onClick={onButtonSubmit}
				>Detect</button>
				</div>
			</div>
		</div>


	);
}

export default ImageLinkForm;