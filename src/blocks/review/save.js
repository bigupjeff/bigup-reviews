import { __ } from '@wordpress/i18n'
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

export default function save() {

	const blockProps = useBlockProps.save()

	return (
		<div { ...blockProps } >
			<InnerBlocks.Content />
		</div>
	)
}
