var exec = require('child_process').exec;

let port = 5000;
let commandlinefind = `netstat -a -n -o | findstr :${port}`;
let processid;
let process = [];

let main = async () => {
	await find();
};

let find = async () => {
	await exec(commandlinefind, async function(
		error,
		stdOut,
		stdErr
	) {
		console.log('\033[34m Buscando processos para a porta:');
		console.log('stdout: ' + stdOut);

		if (stdErr) {
			console.log('\033[31m stdErr: ' + stdErr);
		}

		for (let i = 0; i < stdOut.length; i++) {
			if (i > 70 && i < 76) {
				await process.push(stdOut[i]);
			}
		}

		processid =
			process[0] +
			process[1] +
			process[2] +
			process[3] +
			process[4];

		kill(processid);
	});

	return processid;
};

let kill = async processid => {
	if (processid) {
		console.log('\033[1;33m Filtrando processos...');
		await exec(`tskill ${processid}`, function(
			error,
			stdOut,
			stdErr
		) {
			console.log('\033[0;32m .. .');
			console.log(
				` Porta Liberada, o processo ${processid} ocupando a porta ${port} foi finalizado`
			);
			if (stdErr) {
				console.log('\033[31m stdErr: ' + stdErr);
			}
		});
	} else {
		console.log(
			'\033[34m Não foi encontrado nenhum processo usando esta porta!'
		);
	}
};

main();
