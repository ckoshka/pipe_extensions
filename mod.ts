import * as R from "https://esm.sh/ramda@0.28.0";

const trycatch = (fn: R.AnyFunction) => {
	try {
		return fn();
	} catch (e) {
		return new Error(e);
	}
};

export const aPipe = R.pipeWith((fn, r) => Promise.resolve(r).then(fn));

export const tryPipe = R.pipeWith((fn, r) =>
	r instanceof Error ? r : trycatch(() => fn(r))
);

export const asyncTryPipe = R.pipeWith((fn, r) => Promise.resolve(r).catch(e => e).then(e => e instanceof Error ? e : fn(e)));

export const nullPipe = R.pipeWith((fn, r) =>
	r === null || r === undefined ? r : fn(r)
);
