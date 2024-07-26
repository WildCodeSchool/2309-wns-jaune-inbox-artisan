import { FormInstance, GetProp, UploadProps } from 'antd';

export type ImageModalPropsType = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	ImageForm: FormInstance;
	onFinish: () => void;
};

export type FolderModalPropsType = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	FolderForm: FormInstance;
	onFinish: () => void;
};

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
