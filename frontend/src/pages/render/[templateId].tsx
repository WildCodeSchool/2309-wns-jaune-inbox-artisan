import { Layout } from "antd"
import { NextPageWithLayout } from "../_app"
import { useRouter } from "next/router"
import { useUpdateTemplateMutation } from "@/types/graphql"
import { useEffect } from "react"

const {Sider, Content} = Layout

const Render: NextPageWithLayout = () => {
    const mail = ''
	const router = useRouter()
    const templateId = router.query.templateId as string;

    const [printTemplate] = useUpdateTemplateMutation({
		fetchPolicy: 'no-cache',
		onCompleted(updateTemplateData) {
			console.log(updateTemplateData)},
		onError(updateError) {
			console.log("updateError:", updateError)
		}
	});

    useEffect(() => {
		console.log(templateId)
		if(templateId) printTemplate({ variables: { id: Number(router.query.templateId) } });
	}, [templateId]);
    return (
        <div>
            {mail}
        </div>
    )
}


export default Render