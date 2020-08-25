import React from 'react';
import PageLayout from "../../layout/PageLayout";
import SectionLayout from "../../layout/SectionLayout";
import LangChange from "../../header/LangChange";
import {connect} from "react-redux";
import {logout, setLanguage} from "../../../actions";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent:"center",
        flexDirection: 'column',
        alignItems:"flex-start",
        textAlign: "center",
        width: '100%'
    }
})

function Settings({language, setLanguage}) {
    const classes = useStyles()
    const handleLangChange = language => setLanguage(language);
    return (
        <PageLayout wrap={false}>
            <SectionLayout >
                <div className={classes.container}>
                    <label>Language change</label>
                    <LangChange onLangChange={handleLangChange} selectedLanguage={language}/>
                </div>
            </SectionLayout>
        </PageLayout>
    );
}

const mapStateToProps = state => ({
    language: state.system.language
})

export default connect(mapStateToProps, {logout, setLanguage})(Settings)
