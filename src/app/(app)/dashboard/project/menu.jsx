import PrimaryButton from '@/components/Button'
import '@/app/css/dashboard-project.css'
const menu = ({ searchQuery,handleCreate , handleDeletedFormToggle,handleProjectAnalysis,handleSearch }) => {
    return (
        <section id='menu'>
                  <div className='block-button-left flex gap-2'>
                         <PrimaryButton  onClick={handleCreate} className='btn-create'>
                            <p>Create Project</p>
                            <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M19.2192 14.9993H15.0005M15.0005 14.9993H10.7817M15.0005 14.9993V19.218M15.0005 14.9993L15.0005 10.7806M26.25 7.96873L26.25 22.0313C26.25 24.3612 24.3612 26.25 22.0312 26.25H7.96875C5.6388 26.25 3.75 24.3612 3.75 22.0313V7.96873C3.75 5.63879 5.6388 3.75 7.96875 3.75H22.0313C24.3612 3.75 26.25 5.63879 26.25 7.96873Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                         </PrimaryButton>

                         <PrimaryButton onClick={handleProjectAnalysis} className='btn-create btn-report'>
                            <p>Project Progress</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.40002C17.3019 2.40006 21.5999 6.69814 21.5999 12.0001C21.5999 17.302 17.3018 21.6001 11.9999 21.6001C6.69797 21.6001 2.3999 17.302 2.3999 12.0001C2.3999 6.6981 6.698 2.39999 12 2.40002ZM12 2.40002L11.9999 12.0001M11.9999 12.0001L5.3999 18.6001M11.9999 12.0001L5.3999 5.40008" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                         </PrimaryButton>
                  </div>
                  <div className='block-button-right'> 

                    <div className='block-search'>
                            <input 
                                type="text" 
                                name="query" 
                                placeholder="Search projects" 
                                value={searchQuery}
                                onChange={handleSearch} 
                            />
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                    </div>
                        <PrimaryButton onClick={handleDeletedFormToggle} className='btn-delete'>
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 13.1429V17.7143C3 18.9767 4.00736 20 5.25 20H18.75C19.9926 20 21 18.9767 21 17.7143V13.1429M3 13.1429L5.82751 5.48315C6.15683 4.59102 6.99635 4 7.93425 4H16.0657C17.0037 4 17.8432 4.59102 18.1725 5.48315L21 13.1429M3 13.1429H7.5L9 14.7429H15L16.5 13.1429H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                        </PrimaryButton>
                  </div>
            </section>
    )
}

export default menu