export const Loading = () => {
    return (
        <div className="flex min-h-full flex-col items-center justify-center gap-3 py-10">
            <div
                className="size-8 animate-spin rounded-full border-2 border-lg-gray-5 border-t-lg-active-red"
                role="status"
                aria-label="Loading"
            />
        </div>
    )
}
