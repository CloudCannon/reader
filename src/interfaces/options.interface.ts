export interface IOptions {
	[key: string]: IOptionsItem;
}

interface IOptionsItem {
	bold?: boolean;
	italic?: boolean;
	removeformat?: boolean;
	link?: boolean;
	undo?: boolean;
	redo?: boolean;
	underline?: boolean;
	strike?: boolean;
	subscript?: boolean;
	superscript?: boolean;
	code?: boolean;
	format?: boolean | string;
	blockquote?: boolean;
	horizontalrule?: boolean;
	numberedlist?: boolean;
	bulletedlist?: boolean;
	outdent?: boolean;
	indent?: boolean;
	image?: boolean;
	embed?: boolean;
	table?: boolean;
	styles?: string;
	left?: boolean | string;
	center?: boolean | string;
	right?: boolean | string;
	justify?: boolean | string;

  width?: number;
  height?: number;
  resize_style?: string;
  mime_type?: string;
  expandable?: boolean;
}
