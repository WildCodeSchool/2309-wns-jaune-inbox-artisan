import { gql } from '@apollo/client';


export const INSERT_TEMPLATE = gql`
	mutation InsertTemplate($template: CreateTemplateInputRequest!) {
		insertTemplate(template: $template){
    	id
  	}
	}
`;

export const UPDATE_TEMPLATE = gql`
	mutation UpdateTemplate($template: UpdateTemplateInput!) {
		updateTemplate(template: $template) {
		id
		}
	}
`;
