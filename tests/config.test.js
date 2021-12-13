import test from 'ava';
import { migrateLegacyKeys } from '../src/config.js';

test('Migrate old configuration keys', (t) => {
	const config = {
		'data-config': {
			locations: true
		},
		'collections-config': {
			staff: {
				path: 'content/staff',
				_sort_key: 'name',
				_singular_key: 'staff_member',
				_subtext_key: 'bio',
				_image_key: 'profile_image',
				_image_size: 'cover',
				_singular_name: 'Staff member',
				_disable_add: false,
				_icon: 'person',
				_add_options: []
			}
		},
		_collection_groups: [
			{
				heading: 'Content',
				collections: 'staff'
			}
		],
		'base-url': '/base',
		_editor: {
			default_path: '/landing/'
		},
		_source_editor: {
			theme: 'dawn'
		}
	};

	migrateLegacyKeys(config);

	t.deepEqual(config, {
		data_config: {
			locations: true
		},
		collections_config: {
			staff: {
				path: 'content/staff',
				sort_key: 'name',
				singular_key: 'staff_member',
				subtext_key: 'bio',
				image_key: 'profile_image',
				image_size: 'cover',
				singular_name: 'Staff member',
				disable_add: false,
				icon: 'person',
				add_options: []
			}
		},
		collection_groups: [
			{
				heading: 'Content',
				collections: 'staff'
			}
		],
		base_url: '/base',
		editor: {
			default_path: '/landing/'
		},
		source_editor: {
			theme: 'dawn'
		}
	});
});

