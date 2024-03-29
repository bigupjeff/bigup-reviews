import { __ } from '@wordpress/i18n'
import PropTypes from 'prop-types'
import { TextControl } from '@wordpress/components'
import { PanelRow, Button, ResponsiveWrapper } from '@wordpress/components'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'

const AnyTextControl = ( { data: {
	label,
	description,
	value,
	updateValue,
	placeholder,
	required,
	maxlength
} } ) => {
	return(
		<PanelRow>
			<TextControl
				label={ label }
				help={ description }
				value={ value }
				onChange={ updateValue }
				type={ 'text' }
				placeholder={ placeholder }
				required={ required }
				maxLength={ maxlength }
			/>
		</PanelRow>
	)
}

const EmailControl = ( { data: {
	label,
	description,
	value,
	updateValue,
	placeholder,
	required,
	maxlength
} } ) => {
	return(
		<PanelRow>
			<TextControl
				label={ label }
				help={ description }
				value={ value }
				onChange={ updateValue }
				type={ 'email' }
				inputmode={ 'email' }
				placeholder={ placeholder }
				required={ required }
				maxLength={ maxlength }
			/>
		</PanelRow>
	)
}

const UrlControl = ( { data: {
	label,
	description,
	value,
	updateValue,
	placeholder,
	required,
	maxlength
} } ) => {
	return(
		<PanelRow>
			<TextControl
				label={ label }
				help={ description }
				value={ value }
				onChange={ updateValue }
				type={ 'url' }
				inputmode={ 'url' }
				placeholder={ placeholder }
				required={ required }
				maxLength={ maxlength }
			/>
		</PanelRow>
	)
}

const NumberControl = ( { data: {
	label,
	description,
	value,
	updateValue,
	placeholder,
	required,
	max,
	min,
	step
} } ) => {
	return(
		<PanelRow>
			<TextControl
				label={ label }
				help={ description }
				value={ value }
				onChange={ updateValue }
				type={ 'number' }
				inputmode={ 'numeric' }
				placeholder={ placeholder }
				required={ required }
				max={ max }
				min={ min }
				step={ step }
			/>
		</PanelRow>
	)
}

const DateControl = ( { data: {
	label,
	description,
	value,
	updateValue,
	placeholder,
	required
} } ) => {

	let html5Date     = ''
	const html5DateRe = '^\\d{4}-\\d{2}-\\d{2}$'

	if ( value !== '' && ! value.toString().match( html5DateRe ) ) {
		// Convert from unix timestamp to HTML5 date (yyyy-mm-dd).
		const jsTimeStamp = new Date( value * 1000 )
		const ISOString   = jsTimeStamp.toISOString()
		html5Date = ISOString.split( 'T', 1 )[ 0 ]
	} else {
		html5Date = value
	}

	return(
		<PanelRow>
			<TextControl
				label={ label }
				help={ description }
				value={ html5Date }
				onChange={ updateValue }
				type={ 'date' }
				placeholder={ placeholder }
				required={ required }
			/>
		</PanelRow>
	)
}

const RatingControl = ( { data: {
	label,
	value,
	updateValue,
	max,
	min,
	step,
	required
} } ) => {

	return(
		<PanelRow>
			<div
				className={ 'ratingControl' }
			>
				<label
					className={ 'ratingControl_label' }
					htmlFor={ 'ratingControl_input' }
				>
					{ label + ': ' + value }
				</label>
				<input
					className={ 'ratingControl_input' }
					id={ 'ratingControl_input' }
					onChange={ ( event ) => {
						event.target.style.setProperty( '--value', event.target.value )
						updateValue( event.target.value )
					}}
					style={{ '--value': '2.5' }}
					type={ 'range' }
					value={ value }
					max={ max }
					min={ min }
					step={ step }
					required={ required }
				/>
			</div>
		</PanelRow>
	)
}


const ImageControl = ( { data: { label, value, updateValue, media } } ) => {
	return(
		<>
			<PanelRow>
				<MediaUploadCheck>
					<MediaUpload
						title={ label }
						onSelect={ ( newMedia ) => updateValue( newMedia.id ) }
						value={ value }
						allowedTypes={ [ 'image' ] }
						render={ ( { open } ) => (
							<Button 
								className={ ! value ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
								onClick={ open }
							>
								{ ! value && __( 'Select', 'bigup-reviews' ) + ' ' + label }
								{ media !== undefined &&
								<ResponsiveWrapper
									naturalWidth={ media.media_details.width }
									naturalHeight={ media.media_details.height }
								>
									<img src={ media.source_url } />
								</ResponsiveWrapper>
							}
							</Button>
						) }
					/>
				</MediaUploadCheck>
			</PanelRow>

			{ value &&
				<PanelRow>
					<MediaUploadCheck>
						<MediaUpload
							title={ label }
							value={ value }
							onSelect={ ( newMedia ) => updateValue( newMedia.id ) }
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									variant="secondary" 
									isLarge
								>
									{ __( 'Replace', 'bigup-reviews' ) + ' ' + label }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					<MediaUploadCheck>
						<Button
							onClick={ () => updateValue( 0 ) }
							variant="secondary" 
							isLarge
						>
							{ __( 'Remove', 'bigup-reviews' ) + ' ' + label }
						</Button>
					</MediaUploadCheck>
				</PanelRow>
			}
		</>
	)
}


AnyTextControl.propTypes = {
	data: PropTypes.shape( {
		label: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		updateValue: PropTypes.func.isRequired,
		placeholder: PropTypes.string.isRequired,
		required: PropTypes.bool.isRequired,
		maxlength: PropTypes.number.isRequired
	} )
}

EmailControl.propTypes = {
	data: PropTypes.shape( {
		label: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		updateValue: PropTypes.func.isRequired,
		placeholder: PropTypes.string.isRequired,
		required: PropTypes.bool.isRequired,
		maxlength: PropTypes.number.isRequired
	} )
}

UrlControl.propTypes = {
	data: PropTypes.shape( {
		label: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		updateValue: PropTypes.func.isRequired,
		placeholder: PropTypes.string.isRequired,
		required: PropTypes.bool.isRequired,
		maxlength: PropTypes.number.isRequired
	} )
}

NumberControl.propTypes = {
	data: PropTypes.shape( {
		label: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		updateValue: PropTypes.func.isRequired,
		placeholder: PropTypes.string.isRequired,
		required: PropTypes.bool.isRequired,
		max: PropTypes.number.isRequired,
		min: PropTypes.number.isRequired,
		step: PropTypes.number.isRequired
	} )
}

DateControl.propTypes = {
	data: PropTypes.shape( {
		label: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		updateValue: PropTypes.func.isRequired,
		placeholder: PropTypes.string.isRequired,
		required: PropTypes.bool.isRequired
	} )
}

RatingControl.propTypes = {
	data: PropTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		updateValue: PropTypes.func.isRequired,
		max: PropTypes.number.isRequired,
		min: PropTypes.number.isRequired,
		step: PropTypes.number.isRequired,
		required: PropTypes.object.isRequired
	} )
}


ImageControl.propTypes = {
	data: PropTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		updateValue: PropTypes.func.isRequired,
		required: PropTypes.bool.isRequired
	} )
}

export {
	AnyTextControl,
	EmailControl,
	UrlControl,
	NumberControl,
	DateControl,
	RatingControl,
	ImageControl
}
