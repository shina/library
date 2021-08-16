const scriptPath = Deno.args[1];
const tasks = {
    install: `deno cache ${scriptPath}/deps.ts --lock=${scriptPath}/lock.json`,
    update: `deno cache ${scriptPath}/deps.ts --lock=${scriptPath}/lock.json --lock-write`,
}

function getDenoCmd(cmd: string): string[] {
    return cmd.split(" ");
}

async function exec(cmd: string) {
    const proc = await Deno.run({ cmd: getDenoCmd(cmd) }).status();

    if (proc.success == false) {
        Deno.exit(proc.code);
    }

    return proc;
}

const taskName = Deno.args[0] as keyof typeof tasks;
if (taskName) {
    exec(tasks[taskName]);
} else {
    console.log(tasks);
}
