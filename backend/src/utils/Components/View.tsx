import React, { ReactNode } from 'react';
import { Row, Col } from 'antd';

import Components from './mailComponents';

const View = ({ config, variables }: { config: any[][]; variables: any[] }) => {
	console.log(config);
	const generateGrid = () => {
		return (
			<div className=" w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
				{config?.map((row: any[], rowIndex: number) => (
					<div key={rowIndex}>
						{row?.map((col: any, colIndex: number) => (
							<div
								// span={col?.containerWidth}
								key={colIndex}
								style={{ userSelect: 'none', maxHeight: '100%' }}
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
							</div>
						))}
					</div>
				))}
			</div>
		);
	};

	return <>{generateGrid()}</>;
};

export default View;
