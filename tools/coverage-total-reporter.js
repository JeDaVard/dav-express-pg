const { execSync } = require('child_process');

class CoverageTotalReporter {
    constructor(opts) {
        this.opts = opts;
    }

    getJestTotal() {
        const { lines, statements, functions, branches } = this.summary;
        const total = (lines.pct + statements.pct + functions.pct + branches.pct) / 4;
        return total.toFixed(2);
    }

    printTotal(prefix, total, useColors) {
        const color = total < 80 ? '\x1b[31m' : '\x1b[32m';
        const reset = '\x1b[0m';
        const bold = '\x1b[1m';
        const smallPercentage = total < 80 ? '(< 80%)' : '';

        const label =
            prefix +
            Array(20 - prefix.length)
                .fill(' ')
                .join('');
        const output = `${label}: ${total}%`;

        if (useColors) {
            console.log(`${bold}${color}${output} ${smallPercentage}${reset}`);
        } else {
            console.log(`${bold}${output}${reset}`);
        }
    }

    execSync(...args) {
        args.forEach((arg) => {
            execSync(arg, { stdio: 'inherit' });
        });
    }

    onRunComplete(_, report) {
        if (!report.coverageMap) return;

        const { data: summary } = report.coverageMap.getCoverageSummary();
        this.summary = summary;
        const coverage = this.getJestTotal();
        console.log(
            '=============================== Coverage Total ===============================',
        );
        this.printTotal('Jest Total', coverage, true);
        console.log(
            '================================================================================',
        );

        if (process.env.CI && process.env.GITHUB_WORKFLOW) {
            this.execSync(`echo "GH_COVERAGE=${coverage}" >> $GITHUB_ENV`);
        }
    }
}

module.exports = CoverageTotalReporter;
