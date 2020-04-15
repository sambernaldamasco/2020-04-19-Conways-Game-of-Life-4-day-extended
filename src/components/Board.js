import React, { useEffect, useState } from 'react';

function Board(props) {
	const canvasRef = React.useRef(null);
	const [ctx, setCtx] = useState();

	//generating board grid
	const generateGrid = () => {
		const tableRow = [];
		for (let row = 0; row < props.boardRows; row++) {
			const tableData = [];
			for (let column = 0; column < props.boardColumns; column++) {
				tableData.push(
					<td
						key={`${row}, ${column}`}
						className={props.boardStatus[row][column] ? 'alive' : 'dead'}
					/>
				);
			} //end of column for
			tableRow.push(<tr key={row}>{tableData}</tr>);
		} //end of row for

		return (
			<table>
				<tbody> {tableRow}</tbody>
			</table>
		);
	};

	useEffect(() => {
		const context = canvasRef.current.getContext('2d');
		setCtx(context);
	});

	const generateCanvas = () => {
		console.log(ctx);

		if (ctx !== undefined) {
			ctx.strokeStyle = '#e1e1e1';
			ctx.fillStyle = 'cadetblue';

			ctx.clearRect(0, 0, 1512, 512);
			for (let row = 0; row < props.boardRows; row++) {
				for (let column = 0; column < props.boardColumns; column++) {
					ctx.beginPath();
					ctx.rect(row * 8, column * 8, 8, 8);
					props.boardStatus[row][column] ? ctx.fill() : ctx.stroke();
				}
			}
		}

		return <canvas ref={canvasRef} width="1512" height="1512" />;
	};

	const finalGrid = generateCanvas();
	return finalGrid;
}

export default Board;