import React, { ReactNode } from 'react';
import { Row, Col } from 'antd';

import Components from './mailComponents';

const View = ({ config, variables }: { config: any[][]; variables: any[] }) => {
	const generateGrid = () => {
		return (
			<div className=" w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
				{config?.map((row: any[], rowIndex: number) => (
					<Row key={rowIndex}>
						{row?.map((col: any, colIndex: number) => (
							<Col
								span={col?.containerWidth}
								key={colIndex}
								className="select-none max-h-full"
							>
								{col.name ? (
									<Components
										name={col.name}
										keys={col.keys}
										style={col.style}
										variables={variables}
									/>
								) : (
									''
								)}
							</Col>
						))}
					</Row>
				))}
			</div>
		);
	};

	return <>{generateGrid()}</>;
};

export default View;
